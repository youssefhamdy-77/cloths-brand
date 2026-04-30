"use client";

import React, { useState } from 'react';
import { Search, Package, CheckCircle, Clock, Truck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTracking(null);

    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order not found');
      setTracking(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string, done: boolean) => {
    if (status.includes('Placed')) return <Package size={18} />;
    if (status.includes('Payment')) return <CheckCircle size={18} />;
    if (status.includes('Confirmed')) return <CheckCircle size={18} />;
    if (status.includes('Packed')) return <Package size={18} />;
    if (status.includes('Shipped')) return <Truck size={18} />;
    if (status.includes('Delivery')) return <Truck size={18} />;
    if (status.includes('Delivered')) return <MapPin size={18} />;
    if (status.includes('Cancelled')) return <Clock size={18} />;
    return <Clock size={18} />;
  };

  return (
    <div className="min-h-screen bg-[#030306] text-[#F5F7FF] flex flex-col">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.08)] bg-[#070718]/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#5B3CFF] to-[#6D4CFF] flex items-center justify-center font-bold text-white shadow-lg">A</div>
            <span className="text-xl font-bold tracking-widest" style={{ textShadow: '0 0 20px rgba(109,76,255,0.5)' }}>AMBER</span>
          </Link>
          <p className="text-sm text-[#A5A7C8]">Order Tracking</p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        {/* Search Form */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ textShadow: '0 0 20px rgba(109,76,255,0.5)' }}>Track Your Order</h1>
          <p className="text-[#A5A7C8]">Enter your order number and phone number to see your order status.</p>
        </div>

        <form onSubmit={handleTrack} className="glass-panel rounded-2xl p-8 mb-10 max-w-lg mx-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#A5A7C8] mb-2">Order Number</label>
              <input
                type="text"
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value)}
                placeholder="AMB-2026-0001"
                className="w-full bg-[#070718] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-[#6F7195] focus:outline-none focus:border-[#5B3CFF] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#A5A7C8] mb-2">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="01000000000"
                className="w-full bg-[#070718] border border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white placeholder-[#6F7195] focus:outline-none focus:border-[#5B3CFF] transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#5B3CFF] to-[#6D4CFF] rounded-xl text-white font-bold hover:shadow-[0_0_25px_rgba(91,60,255,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
              ) : (
                <Search size={18} />
              )}
              <span>{loading ? 'Searching...' : 'Track Order'}</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="max-w-lg mx-auto mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Tracking Results */}
        {tracking && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Order Summary */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{tracking.orderNumber}</h2>
                  <p className="text-[#A5A7C8] text-sm mt-1">Placed on {new Date(tracking.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    tracking.orderStatus === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                    tracking.orderStatus === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                    tracking.orderStatus === 'Shipped' ? 'bg-[#5B3CFF]/20 text-[#8B7CFF]' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {tracking.orderStatus}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    tracking.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {tracking.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-[#070718]">
                  <p className="text-xs text-[#6F7195] uppercase tracking-wider mb-1">Payment</p>
                  <p className="font-medium text-sm capitalize">{tracking.paymentMethod?.replace('_', ' ')}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#070718]">
                  <p className="text-xs text-[#6F7195] uppercase tracking-wider mb-1">Total</p>
                  <p className="font-medium text-sm">EGP {tracking.total?.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#070718]">
                  <p className="text-xs text-[#6F7195] uppercase tracking-wider mb-1">Shipping</p>
                  <p className="font-medium text-sm">EGP {tracking.shippingFee || 0}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#070718]">
                  <p className="text-xs text-[#6F7195] uppercase tracking-wider mb-1">Tracking #</p>
                  <p className="font-medium text-sm">{tracking.trackingNumber || 'Pending'}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="font-bold mb-6">Order Timeline</h3>
              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[rgba(255,255,255,0.08)]"></div>
                {tracking.timeline?.map((step: any, i: number) => (
                  <div key={i} className="relative mb-6 last:mb-0">
                    <div className={`absolute left-[-22px] w-6 h-6 rounded-full flex items-center justify-center ${
                      step.done
                        ? 'bg-[#5B3CFF] text-white shadow-[0_0_10px_rgba(91,60,255,0.5)]'
                        : 'bg-[#10102C] border border-[rgba(255,255,255,0.12)] text-[#6F7195]'
                    }`}>
                      {step.done ? <CheckCircle size={12} /> : <Clock size={12} />}
                    </div>
                    <div className="ml-4">
                      <p className={`font-medium text-sm ${step.done ? 'text-white' : 'text-[#6F7195]'}`}>{step.status}</p>
                      {step.date && (
                        <p className="text-xs text-[#6F7195] mt-0.5">{new Date(step.date).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-[rgba(255,255,255,0.08)]">
                <h3 className="font-bold">Ordered Items</h3>
              </div>
              <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                {tracking.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#10102C] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                        <Package size={16} className="text-[#6F7195]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name || 'Product'}</p>
                        <p className="text-xs text-[#6F7195]">
                          {item.size && `Size: ${item.size}`} {item.color && `· Color: ${item.color}`} · Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-sm">EGP {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[rgba(255,255,255,0.08)] py-6 text-center text-xs text-[#6F7195]">
        © 2026 Amber. All rights reserved.
      </footer>
    </div>
  );
}
