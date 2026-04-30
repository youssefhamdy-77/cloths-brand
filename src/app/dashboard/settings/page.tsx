"use client";

import React, { useState } from 'react';
import { Save, Store, CreditCard, Users, Shield, Globe, Bell } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('store');
  const [saved, setSaved] = useState(false);

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Amber',
    currency: 'EGP',
    shippingFee: 60,
    freeShippingThreshold: 500,
    lowStockThreshold: 10,
    taxRate: 0,
    websiteUrl: 'https://amber.com',
    corsAllowedDomain: 'https://amber.com'
  });

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'instapay', name: 'InstaPay', enabled: true, account: 'amber@instapay', instructions: 'Transfer the total amount to our InstaPay IPA. Include your order number in the transfer notes.' },
    { id: 'vodafone_cash', name: 'Vodafone Cash', enabled: true, account: '01000000000', instructions: 'Send the total amount to our Vodafone Cash number. Take a screenshot as proof.' },
    { id: 'etisalat_cash', name: 'Etisalat Cash', enabled: true, account: '01100000000', instructions: 'Transfer via Etisalat Cash wallet. Upload proof of payment.' },
    { id: 'orange_cash', name: 'Orange Cash', enabled: false, account: '01200000000', instructions: 'Send via Orange Cash. Upload your receipt.' },
    { id: 'cod', name: 'Cash on Delivery', enabled: true, account: '', instructions: 'Pay when your order arrives.' },
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const togglePayment = (id: string) => {
    setPaymentMethods(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const tabs = [
    { id: 'store', label: 'Store', icon: Store },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-brand-muted">Configure your store, payments, and integrations.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-neon rounded-xl text-white font-medium transition-all shadow-[0_0_15px_rgba(91,60,255,0.4)]">
          <Save size={18} />
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-brand-primary text-white shadow-[0_0_15px_rgba(91,60,255,0.3)]'
                : 'bg-glass-surface border border-glass-border text-brand-muted hover:text-white hover:bg-brand-panel'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Store Settings */}
      {activeTab === 'store' && (
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold">Store Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-brand-muted mb-2">Store Name</label>
              <input type="text" value={storeSettings.storeName} onChange={e => setStoreSettings(s => ({ ...s, storeName: e.target.value }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-2">Currency</label>
              <select value={storeSettings.currency} onChange={e => setStoreSettings(s => ({ ...s, currency: e.target.value }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary">
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-2">Shipping Fee (EGP)</label>
              <input type="number" value={storeSettings.shippingFee} onChange={e => setStoreSettings(s => ({ ...s, shippingFee: Number(e.target.value) }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-2">Free Shipping Above (EGP)</label>
              <input type="number" value={storeSettings.freeShippingThreshold} onChange={e => setStoreSettings(s => ({ ...s, freeShippingThreshold: Number(e.target.value) }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-2">Low Stock Threshold</label>
              <input type="number" value={storeSettings.lowStockThreshold} onChange={e => setStoreSettings(s => ({ ...s, lowStockThreshold: Number(e.target.value) }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-2">Tax Rate (%)</label>
              <input type="number" value={storeSettings.taxRate} onChange={e => setStoreSettings(s => ({ ...s, taxRate: Number(e.target.value) }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method.enabled ? 'bg-brand-primary/20' : 'bg-brand-dim/10'}`}>
                    <CreditCard size={20} className={method.enabled ? 'text-brand-primary' : 'text-brand-dim'} />
                  </div>
                  <div>
                    <h4 className="font-bold">{method.name}</h4>
                    <p className="text-xs text-brand-dim">{method.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePayment(method.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${method.enabled ? 'bg-brand-primary' : 'bg-brand-dim/30'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${method.enabled ? 'left-6' : 'left-0.5'}`}></div>
                </button>
              </div>
              {method.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-glass-border/50">
                  <div>
                    <label className="block text-sm text-brand-muted mb-1">Account / Number</label>
                    <input type="text" value={method.account}
                      onChange={e => setPaymentMethods(prev => prev.map(p => p.id === method.id ? { ...p, account: e.target.value } : p))}
                      className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary" />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-muted mb-1">Instructions for Customer</label>
                    <input type="text" value={method.instructions}
                      onChange={e => setPaymentMethods(prev => prev.map(p => p.id === method.id ? { ...p, instructions: e.target.value } : p))}
                      className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Users & Roles */}
      {activeTab === 'users' && (
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Team Members</h3>
          <p className="text-brand-muted text-sm mb-6">Manage who has access to the admin panel and their permissions.</p>
          <div className="space-y-3">
            {[
              { name: 'Amber Owner', email: 'admin@amber.com', role: 'Owner' },
              { name: 'Sarah Admin', email: 'sarah@amber.com', role: 'Admin' },
              { name: 'Ahmed Accountant', email: 'ahmed@amber.com', role: 'Accountant' },
              { name: 'Nour Inventory', email: 'nour@amber.com', role: 'Inventory Manager' },
              { name: 'Omar Orders', email: 'omar@amber.com', role: 'Order Manager' },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-brand-surface/50 hover:bg-brand-surface transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-panel border border-glass-border flex items-center justify-center text-sm font-bold text-brand-primary">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-brand-dim">{user.email}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/15 text-brand-soft border border-brand-primary/20">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface/50">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-brand-dim">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 border border-glass-border rounded-xl text-sm hover:bg-glass-surface transition-colors">Enable</button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface/50">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-brand-dim">Auto-logout after inactivity</p>
              </div>
              <select className="bg-brand-bg border border-glass-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
                <option>24 hours</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-brand-surface/50">
              <div>
                <p className="font-medium">Audit Logging</p>
                <p className="text-sm text-brand-dim">Track all admin actions</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold">Website Integration</h3>
          <p className="text-brand-muted text-sm">Connect this management system with the Amber website.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-brand-muted mb-2">Website URL</label>
              <input type="text" value={storeSettings.websiteUrl} onChange={e => setStoreSettings(s => ({ ...s, websiteUrl: e.target.value }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="block text-sm text-brand-muted mb-2">CORS Allowed Domain</label>
              <input type="text" value={storeSettings.corsAllowedDomain} onChange={e => setStoreSettings(s => ({ ...s, corsAllowedDomain: e.target.value }))}
                className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
            <div className="p-4 rounded-xl bg-brand-surface/50 border border-glass-border">
              <p className="font-medium mb-2">API Endpoints</p>
              <div className="space-y-2 font-mono text-xs text-brand-dim">
                <p>GET  /api/products</p>
                <p>GET  /api/products/:slug</p>
                <p>POST /api/orders</p>
                <p>GET  /api/orders/track</p>
                <p>POST /api/payments</p>
                <p>GET  /api/settings/payment-methods</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold">Notification Preferences</h3>
          {[
            { label: 'New Order Received', enabled: true },
            { label: 'Payment Proof Uploaded', enabled: true },
            { label: 'Payment Verified', enabled: true },
            { label: 'Low Stock Alert', enabled: true },
            { label: 'Order Shipped', enabled: false },
            { label: 'Order Delivered', enabled: false },
            { label: 'Order Cancelled', enabled: true },
          ].map((notif, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-brand-surface/50">
              <span className="text-sm font-medium">{notif.label}</span>
              <div className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${notif.enabled ? 'bg-brand-primary' : 'bg-brand-dim/30'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${notif.enabled ? 'left-6' : 'left-0.5'}`}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
