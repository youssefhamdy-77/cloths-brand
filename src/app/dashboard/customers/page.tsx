"use client";

import React, { useState, useEffect } from 'react';
import { Search, Users, Mail, Phone, ShoppingBag } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = (q?: string) => {
    const url = q ? `/api/customers?search=${encodeURIComponent(q)}` : '/api/customers';
    fetch(url)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCustomers(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers(search);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
          <p className="text-brand-muted">View and manage your customer database.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-primary/10"><Users size={24} className="text-brand-primary" /></div>
          <div>
            <p className="text-brand-muted text-sm">Total Customers</p>
            <p className="text-2xl font-bold">{customers.length}</p>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10"><ShoppingBag size={24} className="text-emerald-400" /></div>
          <div>
            <p className="text-brand-muted text-sm">Total Orders</p>
            <p className="text-2xl font-bold">{customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0)}</p>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-brand-neon/10"><span className="text-brand-neon text-xl font-bold">£</span></div>
          <div>
            <p className="text-brand-muted text-sm">Total Spent</p>
            <p className="text-2xl font-bold">EGP {customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="p-4 border-b border-glass-border bg-brand-surface/50">
          <div className="relative w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, or email..."
              className="w-full bg-brand-bg border border-glass-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-primary text-brand-white"
            />
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-glass-border bg-brand-panel/30">
                <th className="p-4 text-sm text-brand-muted font-medium">Customer</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Phone</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Email</th>
                <th className="p-4 text-sm text-brand-muted font-medium text-right">Orders</th>
                <th className="p-4 text-sm text-brand-muted font-medium text-right">Total Spent</th>
                <th className="p-4 text-sm text-brand-muted font-medium text-right">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-brand-dim">Loading...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-brand-dim">No customers found</td></tr>
              ) : (
                customers.map(c => (
                  <tr key={c._id} className="border-b border-glass-border/30 hover:bg-glass-surface/50 transition-colors cursor-pointer">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-panel border border-glass-border flex items-center justify-center text-sm font-bold text-brand-primary">
                          {c.fullName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <span className="font-medium">{c.fullName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-brand-muted">{c.phone}</td>
                    <td className="p-4 text-sm text-brand-muted">{c.email || '-'}</td>
                    <td className="p-4 text-sm text-right font-bold">{c.totalOrders || 0}</td>
                    <td className="p-4 text-sm text-right font-bold text-emerald-400">EGP {(c.totalSpent || 0).toLocaleString()}</td>
                    <td className="p-4 text-sm text-right text-brand-dim">
                      {c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString() : 'N/A'}
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
