"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Plus } from 'lucide-react';

export default function AccountingPage() {
  const [data, setData] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ title: '', category: 'Other', amount: 0, paymentMethod: '', notes: '' });

  useEffect(() => {
    Promise.all([
      fetch('/api/accounting').then(r => r.json()),
      fetch('/api/expenses').then(r => r.json())
    ]).then(([acc, exp]) => {
      setData(acc);
      if (Array.isArray(exp)) setExpenses(exp);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const addExpense = async () => {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...expenseForm, date: new Date() })
    });
    if (res.ok) {
      setShowExpenseModal(false);
      setExpenseForm({ title: '', category: 'Other', amount: 0, paymentMethod: '', notes: '' });
      const [acc, exp] = await Promise.all([
        fetch('/api/accounting').then(r => r.json()),
        fetch('/api/expenses').then(r => r.json())
      ]);
      setData(acc);
      if (Array.isArray(exp)) setExpenses(exp);
    }
  };

  const categories = ['Manufacturing', 'Shipping', 'Packaging', 'Marketing', 'Ads', 'Salaries', 'Rent', 'Utilities', 'Software', 'Other'];

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-brand-dim">Loading accounting data...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Accounting</h1>
          <p className="text-brand-muted">Financial overview and expense tracking.</p>
        </div>
        <button onClick={() => setShowExpenseModal(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-neon rounded-xl text-white font-medium transition-colors shadow-[0_0_15px_rgba(91,60,255,0.4)]">
          <Plus size={18} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-emerald-400" />
            <p className="text-brand-muted text-sm">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-emerald-400">EGP {(data?.totalRevenue || 0).toLocaleString()}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={18} className="text-red-400" />
            <p className="text-brand-muted text-sm">Total Expenses</p>
          </div>
          <p className="text-2xl font-bold text-red-400">EGP {(data?.totalExpenses || 0).toLocaleString()}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} className="text-brand-primary" />
            <p className="text-brand-muted text-sm">Gross Profit</p>
          </div>
          <p className="text-2xl font-bold">{data?.grossProfit >= 0 ? (
            <span className="text-emerald-400">EGP {(data?.grossProfit || 0).toLocaleString()}</span>
          ) : (
            <span className="text-red-400">-EGP {Math.abs(data?.grossProfit || 0).toLocaleString()}</span>
          )}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-brand-neon" />
            <p className="text-brand-muted text-sm">Net Profit</p>
          </div>
          <p className="text-2xl font-bold">{data?.netProfit >= 0 ? (
            <span className="text-emerald-400">EGP {(data?.netProfit || 0).toLocaleString()}</span>
          ) : (
            <span className="text-red-400">-EGP {Math.abs(data?.netProfit || 0).toLocaleString()}</span>
          )}</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Total Orders</p>
          <p className="text-xl font-bold">{data?.totalOrders || 0}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Paid Orders</p>
          <p className="text-xl font-bold text-emerald-400">{data?.paidOrders || 0}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Unpaid Orders</p>
          <p className="text-xl font-bold text-amber-400">{data?.unpaidOrders || 0}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <p className="text-brand-dim text-xs uppercase tracking-wider mb-1">Refunds</p>
          <p className="text-xl font-bold text-red-400">EGP {(data?.totalRefunds || 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Payment Method */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="font-bold mb-4">Revenue by Payment Method</h3>
          <div className="space-y-3">
            {data?.revenueByMethod && Object.entries(data.revenueByMethod).map(([method, amount]: any) => (
              <div key={method} className="flex items-center justify-between p-3 rounded-xl bg-brand-surface/50">
                <span className="text-sm capitalize">{method.replace('_', ' ')}</span>
                <span className="font-bold text-emerald-400">EGP {amount.toLocaleString()}</span>
              </div>
            ))}
            {(!data?.revenueByMethod || Object.keys(data.revenueByMethod).length === 0) && (
              <p className="text-brand-dim text-sm text-center py-4">No revenue data yet</p>
            )}
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="font-bold mb-4">Expenses by Category</h3>
          <div className="space-y-3">
            {data?.expensesByCategory && Object.entries(data.expensesByCategory).map(([cat, amount]: any) => (
              <div key={cat} className="flex items-center justify-between p-3 rounded-xl bg-brand-surface/50">
                <span className="text-sm">{cat}</span>
                <span className="font-bold text-red-400">EGP {amount.toLocaleString()}</span>
              </div>
            ))}
            {(!data?.expensesByCategory || Object.keys(data.expensesByCategory).length === 0) && (
              <p className="text-brand-dim text-sm text-center py-4">No expenses recorded yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Expenses Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-glass-border">
          <h3 className="font-bold">Recent Expenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-glass-border bg-brand-panel/30">
                <th className="p-4 text-sm text-brand-muted font-medium">Title</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Category</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Amount</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Date</th>
                <th className="p-4 text-sm text-brand-muted font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-brand-dim">No expenses</td></tr>
              ) : (
                expenses.map(exp => (
                  <tr key={exp._id} className="border-b border-glass-border/30 hover:bg-glass-surface/50 transition-colors">
                    <td className="p-4 text-sm font-medium">{exp.title}</td>
                    <td className="p-4 text-sm text-brand-muted">{exp.category}</td>
                    <td className="p-4 text-sm font-bold text-red-400">EGP {exp.amount?.toLocaleString()}</td>
                    <td className="p-4 text-sm text-brand-dim">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="p-4 text-sm text-brand-dim">{exp.notes || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowExpenseModal(false)}>
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Add Expense</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-brand-muted mb-1">Title</label>
                <input type="text" value={expenseForm.title} onChange={e => setExpenseForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary" placeholder="e.g. Fabric supplier payment" />
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-1">Category</label>
                <select value={expenseForm.category} onChange={e => setExpenseForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-1">Amount (EGP)</label>
                <input type="number" value={expenseForm.amount} onChange={e => setExpenseForm(f => ({ ...f, amount: Number(e.target.value) }))}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary" />
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-1">Notes</label>
                <input type="text" value={expenseForm.notes} onChange={e => setExpenseForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary" placeholder="Optional notes" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowExpenseModal(false)} className="flex-1 py-2.5 border border-glass-border rounded-xl text-brand-muted hover:bg-glass-surface transition-colors">Cancel</button>
                <button onClick={addExpense} className="flex-1 py-2.5 bg-brand-primary rounded-xl text-white font-medium hover:bg-brand-neon transition-colors">Add Expense</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
