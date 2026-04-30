"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-brand-dim/20 text-brand-dim border-brand-dim/30';
      case 'Confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Shipped': return 'bg-brand-primary/20 text-brand-soft border-brand-primary/30';
      case 'Delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-brand-dim/20 text-brand-dim border-brand-dim/30';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'Unpaid': return 'text-brand-dim';
      case 'Pending Verification': return 'text-amber-400';
      case 'Paid': return 'text-emerald-400';
      case 'Failed': return 'text-red-400';
      default: return 'text-brand-dim';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
          <p className="text-brand-muted">Manage customer orders and payment verifications.</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-glass-border flex justify-between items-center bg-brand-surface/50">
          <div className="relative w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim" />
            <input 
              type="text" 
              placeholder="Search by order number or customer..." 
              className="w-full bg-brand-bg border border-glass-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-primary text-brand-white"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-glass-surface border border-glass-border rounded-lg text-sm hover:bg-brand-panel transition-colors">
              <Filter size={16} />
              <span>Status</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-glass-surface border border-glass-border rounded-lg text-sm hover:bg-brand-panel transition-colors">
              <Filter size={16} />
              <span>Date</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glass-border bg-brand-panel/30">
                <th className="p-4 font-medium text-brand-muted text-sm">Order ID</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Date</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Customer</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Total</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Payment</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Status</th>
                <th className="p-4 font-medium text-brand-muted text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-brand-dim">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-brand-dim">No orders found.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b border-glass-border/50 hover:bg-glass-surface/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-brand-white">{order.orderNumber}</p>
                    </td>
                    <td className="p-4 text-sm text-brand-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{order.customer?.fullName || 'Guest'}</p>
                      <p className="text-xs text-brand-dim">{order.customer?.phone || 'N/A'}</p>
                    </td>
                    <td className="p-4 text-sm font-bold">EGP {order.total}</td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{order.paymentMethod?.replace('_', ' ').toUpperCase()}</p>
                      <p className={`text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>{order.paymentStatus}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/orders/${order._id}`} className="p-2 hover:bg-brand-panel rounded text-brand-muted hover:text-brand-white transition-colors">
                          <Eye size={16} />
                        </Link>
                        {order.paymentStatus === 'Pending Verification' && (
                          <button className="p-2 hover:bg-emerald-500/10 rounded text-amber-400 hover:text-emerald-400 transition-colors" title="Verify Payment">
                            <CheckCircle size={16} />
                          </button>
                        )}
                      </div>
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
