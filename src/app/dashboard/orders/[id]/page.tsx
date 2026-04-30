"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Truck, MapPin, Clock, CreditCard, Package, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then(r => r.json())
      .then(data => { setOrder(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  const updateOrderStatus = async (newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setOrder(updated);
      }
    } catch (err) {
      console.error(err);
    }
    setUpdatingStatus(false);
  };

  const updatePaymentStatus = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setOrder(updated);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      'Pending': 'bg-brand-dim/20 text-brand-dim',
      'Confirmed': 'bg-emerald-500/20 text-emerald-400',
      'Processing': 'bg-blue-500/20 text-blue-400',
      'Packed': 'bg-indigo-500/20 text-indigo-400',
      'Shipped': 'bg-brand-primary/20 text-brand-soft',
      'Out for Delivery': 'bg-purple-500/20 text-purple-400',
      'Delivered': 'bg-green-500/20 text-green-400',
      'Cancelled': 'bg-red-500/20 text-red-400',
      'Returned': 'bg-orange-500/20 text-orange-400',
      'Refunded': 'bg-red-500/20 text-red-400',
    };
    return map[status] || 'bg-brand-dim/20 text-brand-dim';
  };

  const orderStatuses = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned', 'Refunded'];
  const paymentStatuses = ['Unpaid', 'Pending Verification', 'Paid', 'Failed', 'Refunded', 'Partially Refunded'];

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-brand-dim">Loading order...</div>;
  }

  if (!order || order.error) {
    return (
      <div className="text-center py-16">
        <p className="text-brand-dim mb-4">Order not found</p>
        <Link href="/dashboard/orders" className="text-brand-primary hover:underline">← Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/orders" className="p-2 hover:bg-glass-surface rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-brand-muted" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Order {order.orderNumber}</h1>
            <p className="text-brand-muted text-sm">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-xl text-sm font-bold ${getStatusColor(order.orderStatus)}`}>
          {order.orderStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-glass-border flex items-center gap-2">
              <Package size={18} className="text-brand-primary" />
              <h3 className="font-bold">Items</h3>
            </div>
            <div className="divide-y divide-glass-border/30">
              {(order.items || []).map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-glass-surface/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-panel border border-glass-border flex items-center justify-center">
                      <Package size={18} className="text-brand-dim" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name || 'Product'}</p>
                      <p className="text-xs text-brand-dim">
                        {item.size && `Size: ${item.size}`} {item.color && `· Color: ${item.color}`} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-sm">EGP {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-glass-border bg-brand-surface/30 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-brand-muted">Subtotal</span>
                <span>EGP {(order.subtotal || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-muted">Shipping</span>
                <span>EGP {(order.shippingFee || 0).toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-muted">Discount</span>
                  <span className="text-emerald-400">-EGP {order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-glass-border/50">
                <span>Total</span>
                <span className="text-brand-primary">EGP {(order.total || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Status Controls */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="font-bold">Update Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-brand-muted mb-2">Order Status</label>
                <select
                  value={order.orderStatus}
                  onChange={e => updateOrderStatus(e.target.value)}
                  disabled={updatingStatus}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary disabled:opacity-50"
                >
                  {orderStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-2">Payment Status</label>
                <select
                  value={order.paymentStatus}
                  onChange={e => updatePaymentStatus(e.target.value)}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary"
                >
                  {paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-bold mb-3">Internal Notes</h3>
            <textarea
              defaultValue={order.notes || ''}
              placeholder="Add notes about this order..."
              rows={3}
              className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-brand-primary" />
              <h3 className="font-bold">Customer</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-brand-dim uppercase tracking-wider">Name</p>
                <p className="font-medium">{order.customer?.fullName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-brand-dim uppercase tracking-wider">Phone</p>
                <p className="font-medium">{order.customer?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-brand-dim uppercase tracking-wider">Email</p>
                <p className="font-medium text-sm">{order.customer?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-brand-dim uppercase tracking-wider">Address</p>
                <p className="font-medium text-sm">{order.shippingAddress || order.customer?.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={18} className="text-brand-primary" />
              <h3 className="font-bold">Payment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-brand-dim text-sm">Method</span>
                <span className="text-sm font-medium capitalize">{order.paymentMethod?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-dim text-sm">Status</span>
                <span className={`text-sm font-medium ${
                  order.paymentStatus === 'Paid' ? 'text-emerald-400' :
                  order.paymentStatus === 'Failed' ? 'text-red-400' :
                  'text-amber-400'
                }`}>{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          {/* Tracking */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck size={18} className="text-brand-primary" />
              <h3 className="font-bold">Tracking</h3>
            </div>
            <div>
              <label className="block text-xs text-brand-dim uppercase tracking-wider mb-2">Tracking Number</label>
              <input
                type="text"
                defaultValue={order.trackingNumber || ''}
                placeholder="Enter tracking number"
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
