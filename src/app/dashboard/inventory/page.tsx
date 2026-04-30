"use client";

import React, { useState, useEffect } from 'react';
import { Package, Search, Plus, ArrowUpDown, AlertTriangle, ArrowUp, ArrowDown, RotateCcw, Wrench } from 'lucide-react';

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [movements, setMovements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [moveType, setMoveType] = useState('stock_in');
  const [moveQty, setMoveQty] = useState(0);
  const [moveReason, setMoveReason] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/inventory').then(r => r.json())
    ]).then(([prods, moves]) => {
      if (Array.isArray(prods)) setProducts(prods);
      if (Array.isArray(moves)) setMovements(moves);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleStockAction = async () => {
    if (!selectedProduct || moveQty <= 0) return;
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct,
          type: moveType,
          quantity: moveQty,
          reason: moveReason
        })
      });
      if (res.ok) {
        setShowModal(false);
        setMoveQty(0);
        setMoveReason('');
        // Refresh data
        const [prods, moves] = await Promise.all([
          fetch('/api/products').then(r => r.json()),
          fetch('/api/inventory').then(r => r.json())
        ]);
        if (Array.isArray(prods)) setProducts(prods);
        if (Array.isArray(moves)) setMovements(moves);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 10);
  const outOfStock = products.filter(p => p.stock === 0);

  const typeIcon = (type: string) => {
    switch (type) {
      case 'stock_in': return <ArrowUp size={14} className="text-emerald-400" />;
      case 'stock_out': return <ArrowDown size={14} className="text-red-400" />;
      case 'return': return <RotateCcw size={14} className="text-blue-400" />;
      case 'adjustment': return <Wrench size={14} className="text-amber-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Inventory</h1>
          <p className="text-brand-muted">Track stock levels and movements.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-neon rounded-xl text-white font-medium transition-colors shadow-[0_0_15px_rgba(91,60,255,0.4)]">
          <Plus size={18} />
          <span>Add Movement</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-brand-muted text-sm">Total Products</p>
          <p className="text-2xl font-bold mt-1">{products.length}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-brand-muted text-sm">Total Stock</p>
          <p className="text-2xl font-bold mt-1">{totalStock}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-sm text-amber-400">Low Stock</p>
          <p className="text-2xl font-bold mt-1 text-amber-400">{lowStock.length}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-sm text-red-400">Out of Stock</p>
          <p className="text-2xl font-bold mt-1 text-red-400">{outOfStock.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Stock Table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-glass-border">
            <h3 className="font-bold">Stock by Product</h3>
          </div>
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-brand-panel/80 backdrop-blur">
                <tr className="border-b border-glass-border">
                  <th className="p-3 text-sm text-brand-muted font-medium">Product</th>
                  <th className="p-3 text-sm text-brand-muted font-medium">SKU</th>
                  <th className="p-3 text-sm text-brand-muted font-medium text-right">Stock</th>
                  <th className="p-3 text-sm text-brand-muted font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-6 text-center text-brand-dim">Loading...</td></tr>
                ) : products.length === 0 ? (
                  <tr><td colSpan={4} className="p-6 text-center text-brand-dim">No products</td></tr>
                ) : (
                  products.map(p => (
                    <tr key={p._id} className="border-b border-glass-border/30 hover:bg-glass-surface/50 transition-colors">
                      <td className="p-3 text-sm font-medium">{p.name}</td>
                      <td className="p-3 text-sm text-brand-dim">{p.sku || '-'}</td>
                      <td className="p-3 text-sm text-right font-bold">{p.stock}</td>
                      <td className="p-3 text-right">
                        {p.stock === 0 ? (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/15 text-red-400 border border-red-500/20">Out</span>
                        ) : p.stock < 10 ? (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">Low</span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">OK</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Movements */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-glass-border">
            <h3 className="font-bold">Recent Movements</h3>
          </div>
          <div className="overflow-y-auto max-h-[500px]">
            {movements.length === 0 ? (
              <div className="p-6 text-center text-brand-dim">No movements recorded</div>
            ) : (
              <div className="divide-y divide-glass-border/30">
                {movements.slice(0, 20).map((m: any) => (
                  <div key={m._id} className="flex items-center justify-between p-4 hover:bg-glass-surface/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-panel flex items-center justify-center">
                        {typeIcon(m.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{m.productId?.name || 'Unknown Product'}</p>
                        <p className="text-xs text-brand-dim">{m.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${m.type === 'stock_in' || m.type === 'return' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {m.type === 'stock_in' || m.type === 'return' ? '+' : '-'}{m.quantity}
                      </p>
                      <p className="text-xs text-brand-dim">{new Date(m.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Movement Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="glass-panel rounded-2xl p-6 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Add Inventory Movement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-brand-muted mb-1">Product</label>
                <select
                  value={selectedProduct}
                  onChange={e => setSelectedProduct(e.target.value)}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary"
                >
                  <option value="">Select product...</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>{p.name} (Stock: {p.stock})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-1">Type</label>
                <select
                  value={moveType}
                  onChange={e => setMoveType(e.target.value)}
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary"
                >
                  <option value="stock_in">Stock In</option>
                  <option value="stock_out">Stock Out</option>
                  <option value="return">Return</option>
                  <option value="adjustment">Adjustment (Set exact value)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-1">Quantity</label>
                <input
                  type="number"
                  value={moveQty}
                  onChange={e => setMoveQty(Number(e.target.value))}
                  min="0"
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-brand-muted mb-1">Reason</label>
                <input
                  type="text"
                  value={moveReason}
                  onChange={e => setMoveReason(e.target.value)}
                  placeholder="e.g. New shipment arrived"
                  className="w-full bg-brand-bg border border-glass-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-glass-border rounded-xl text-brand-muted hover:bg-glass-surface transition-colors">Cancel</button>
                <button onClick={handleStockAction} className="flex-1 py-2.5 bg-brand-primary rounded-xl text-white font-medium hover:bg-brand-neon transition-colors">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
