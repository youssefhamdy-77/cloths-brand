"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, MoreVertical } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-brand-muted">Manage your catalog, pricing, and availability.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-neon rounded-xl text-white font-medium transition-colors shadow-[0_0_15px_rgba(91,60,255,0.4)]">
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-glass-border flex justify-between items-center bg-brand-surface/50">
          <div className="relative w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-brand-bg border border-glass-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-primary text-brand-white"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-glass-surface border border-glass-border rounded-lg text-sm hover:bg-brand-panel transition-colors">
              <Filter size={16} />
              <span>Category</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-glass-surface border border-glass-border rounded-lg text-sm hover:bg-brand-panel transition-colors">
              <Filter size={16} />
              <span>Status</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glass-border bg-brand-panel/30">
                <th className="p-4 font-medium text-brand-muted text-sm w-12"></th>
                <th className="p-4 font-medium text-brand-muted text-sm">Product Name</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Category</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Price</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Stock</th>
                <th className="p-4 font-medium text-brand-muted text-sm">Status</th>
                <th className="p-4 font-medium text-brand-muted text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-brand-dim">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-brand-dim">No products found. Add your first product.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-glass-border/50 hover:bg-glass-surface/50 transition-colors">
                    <td className="p-4">
                      <div className="w-10 h-10 rounded bg-brand-panel border border-glass-border flex items-center justify-center overflow-hidden">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-brand-dim">No Img</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-brand-white">{product.name}</p>
                      <p className="text-xs text-brand-dim">SKU: {product.sku || 'N/A'}</p>
                    </td>
                    <td className="p-4 text-sm text-brand-muted">{product.category}</td>
                    <td className="p-4 text-sm font-medium">EGP {product.price}</td>
                    <td className="p-4">
                      <span className={`text-sm ${product.stock < 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-brand-dim/10 text-brand-dim border border-brand-dim/20'
                      }`}>
                        {product.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-brand-panel rounded text-brand-muted hover:text-brand-white transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded text-brand-muted hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-glass-border flex items-center justify-between text-sm text-brand-dim">
          <p>Showing {products.length} products</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-brand-surface rounded border border-glass-border hover:bg-brand-panel">Prev</button>
            <button className="px-3 py-1 bg-brand-surface rounded border border-glass-border hover:bg-brand-panel">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
