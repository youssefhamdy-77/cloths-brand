"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Users, ShoppingCart, AlertTriangle, PackageOpen, CreditCard, Clock, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-brand-primary/20 transition-all duration-300">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 ${colorClass}`}></div>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-brand-muted text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-glass-surface`}>
        <Icon size={24} className={colorClass.includes('emerald') ? 'text-emerald-400' : colorClass.includes('amber') ? 'text-amber-400' : 'text-brand-soft'} />
      </div>
    </div>
    {change && (
      <div className="flex items-center text-sm">
        <TrendingUp size={16} className="text-emerald-400 mr-1" />
        <span className="text-emerald-400 font-medium mr-2">{change}</span>
        <span className="text-brand-dim">vs last month</span>
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/accounting').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
    ]).then(([acc, ord, prod]) => {
      setStats(acc);
      if (Array.isArray(ord)) setOrders(ord);
      if (Array.isArray(prod)) setProducts(prod);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 10);
  const outOfStockProducts = products.filter(p => p.stock === 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending');
  const pendingPayments = orders.filter(o => o.paymentStatus === 'Pending Verification');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-brand-dim/20 text-brand-dim';
      case 'Confirmed': return 'bg-emerald-500/20 text-emerald-400';
      case 'Processing': return 'bg-blue-500/20 text-blue-400';
      case 'Shipped': return 'bg-brand-primary/20 text-brand-soft';
      case 'Delivered': return 'bg-green-500/20 text-green-400';
      case 'Cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-brand-dim/20 text-brand-dim';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-brand-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
          <p className="text-brand-dim">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
          <p className="text-brand-muted">Monitor your store performance and inventory.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`EGP ${(stats?.totalRevenue || 0).toLocaleString()}`} change="+12.5%" icon={TrendingUp} colorClass="bg-brand-primary" />
        <StatCard title="Total Orders" value={stats?.totalOrders || 0} change="+5.2%" icon={ShoppingCart} colorClass="bg-emerald-500" />
        <StatCard title="Net Profit" value={`EGP ${(stats?.netProfit || 0).toLocaleString()}`} icon={CreditCard} colorClass="bg-brand-neon" />
        <StatCard title="Low Stock Items" value={lowStockProducts.length + outOfStockProducts.length} icon={AlertTriangle} colorClass="bg-amber-500" />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Pending Orders</p>
          <p className="text-xl font-bold text-amber-400">{pendingOrders.length}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Awaiting Payment</p>
          <p className="text-xl font-bold text-amber-400">{pendingPayments.length}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Paid Orders</p>
          <p className="text-xl font-bold text-emerald-400">{stats?.paidOrders || 0}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Products</p>
          <p className="text-xl font-bold">{products.length}</p>
        </div>
      </div>

      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue by Method */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6">Revenue by Payment Method</h3>
          {stats?.revenueByMethod && Object.keys(stats.revenueByMethod).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(stats.revenueByMethod).map(([method, amount]: any) => {
                const pct = stats.totalRevenue > 0 ? (amount / stats.totalRevenue * 100).toFixed(0) : 0;
                return (
                  <div key={method}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{method.replace('_', ' ')}</span>
                      <span className="font-bold">EGP {amount.toLocaleString()} ({pct}%)</span>
                    </div>
                    <div className="w-full h-3 bg-brand-surface rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-primary to-brand-neon rounded-full transition-all duration-1000" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-brand-dim">No revenue data yet</div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <Link href="/dashboard/orders" className="text-brand-primary text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-3 flex-1">
            {orders.slice(0, 6).map((order) => (
              <Link key={order._id} href={`/dashboard/orders/${order._id}`} className="flex justify-between items-center p-3 rounded-xl hover:bg-glass-surface transition-colors cursor-pointer border border-transparent hover:border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-panel flex items-center justify-center border border-glass-border">
                    <PackageOpen size={16} className="text-brand-muted" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-brand-dim">{order.customer?.fullName || 'Guest'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">EGP {order.total}</p>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>
              </Link>
            ))}
            {orders.length === 0 && (
              <div className="flex items-center justify-center h-full text-brand-dim text-sm">No orders yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Inventory Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-amber-400" />
            <h3 className="text-lg font-bold">Inventory Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {outOfStockProducts.map(p => (
              <div key={p._id} className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-brand-dim">{p.sku}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400">OUT OF STOCK</span>
              </div>
            ))}
            {lowStockProducts.map(p => (
              <div key={p._id} className="flex items-center justify-between p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-brand-dim">{p.sku}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400">{p.stock} LEFT</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
