"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, CreditCard, Eye } from 'lucide-react';

export default function PaymentsPage() {
  const [proofs, setProofs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProofs = () => {
    fetch('/api/payments')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProofs(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchProofs(); }, []);

  const handleAction = async (proofId: string, action: 'approve' | 'reject') => {
    const res = await fetch('/api/payments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proofId, action })
    });
    if (res.ok) fetchProofs();
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'Approved': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'Rejected': return 'bg-red-500/15 text-red-400 border-red-500/20';
      default: return 'bg-brand-dim/15 text-brand-dim border-brand-dim/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Verification</h1>
        <p className="text-brand-muted">Review and verify customer payment proofs.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10"><Clock size={24} className="text-amber-400" /></div>
          <div>
            <p className="text-brand-muted text-sm">Pending Review</p>
            <p className="text-2xl font-bold text-amber-400">{proofs.filter(p => p.status === 'Pending').length}</p>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10"><CheckCircle size={24} className="text-emerald-400" /></div>
          <div>
            <p className="text-brand-muted text-sm">Approved</p>
            <p className="text-2xl font-bold text-emerald-400">{proofs.filter(p => p.status === 'Approved').length}</p>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500/10"><XCircle size={24} className="text-red-400" /></div>
          <div>
            <p className="text-brand-muted text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-400">{proofs.filter(p => p.status === 'Rejected').length}</p>
          </div>
        </div>
      </div>

      {/* Payment Proofs List */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-glass-border">
          <h3 className="font-bold">Payment Proofs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-glass-border bg-brand-panel/30">
                <th className="p-4 text-sm text-brand-muted font-medium">Order</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Method</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Amount</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Sender Phone</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Ref</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Status</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Date</th>
                <th className="p-4 text-sm text-brand-muted font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="p-8 text-center text-brand-dim">Loading...</td></tr>
              ) : proofs.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-brand-dim">No payment proofs submitted yet</td></tr>
              ) : (
                proofs.map(proof => (
                  <tr key={proof._id} className="border-b border-glass-border/30 hover:bg-glass-surface/50 transition-colors">
                    <td className="p-4 font-bold text-sm">{proof.orderId?.orderNumber || proof.orderId}</td>
                    <td className="p-4 text-sm capitalize">{proof.paymentMethod?.replace('_', ' ')}</td>
                    <td className="p-4 text-sm font-bold">EGP {proof.amount}</td>
                    <td className="p-4 text-sm text-brand-muted">{proof.senderPhone || '-'}</td>
                    <td className="p-4 text-sm text-brand-dim font-mono">{proof.transactionReference || '-'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge(proof.status)}`}>
                        {proof.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-brand-dim">{new Date(proof.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      {proof.status === 'Pending' && (
                        <div className="flex items-center justify-end gap-2">
                          {proof.screenshotUrl && (
                            <a href={proof.screenshotUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-brand-panel rounded text-brand-muted hover:text-brand-white transition-colors">
                              <Eye size={16} />
                            </a>
                          )}
                          <button onClick={() => handleAction(proof._id, 'approve')} className="p-2 hover:bg-emerald-500/10 rounded text-brand-muted hover:text-emerald-400 transition-colors" title="Approve">
                            <CheckCircle size={16} />
                          </button>
                          <button onClick={() => handleAction(proof._id, 'reject')} className="p-2 hover:bg-red-500/10 rounded text-brand-muted hover:text-red-400 transition-colors" title="Reject">
                            <XCircle size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
