import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell
} from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <Link href={href} className="flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-white hover:bg-glass-surface rounded-xl transition-colors mb-1">
    <Icon size={20} className="text-brand-soft" />
    <span className="font-medium">{label}</span>
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-glass-border bg-brand-surface hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-primary to-brand-neon flex items-center justify-center font-bold text-white shadow-lg glow-border">A</div>
            <span className="text-xl font-bold tracking-widest text-brand-white glow-text">AMBER</span>
          </Link>
          <div className="text-xs text-brand-muted mt-1 uppercase tracking-widest ml-10">Admin</div>
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-brand-dim mb-3 px-4">Main</div>
            <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <SidebarLink href="/dashboard/orders" icon={ShoppingCart} label="Orders" />
            <SidebarLink href="/dashboard/products" icon={Package} label="Products" />
            <SidebarLink href="/dashboard/inventory" icon={Layers} label="Inventory" />
            <SidebarLink href="/dashboard/customers" icon={Users} label="Customers" />
          </div>

          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-brand-dim mb-3 px-4">Finance</div>
            <SidebarLink href="/dashboard/payments" icon={CreditCard} label="Payments" />
            <SidebarLink href="/dashboard/accounting" icon={BarChart3} label="Accounting" />
          </div>

          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-brand-dim mb-3 px-4">System</div>
            <SidebarLink href="/dashboard/settings" icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="p-4 border-t border-glass-border">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-brand-muted hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-glass-border bg-brand-bg/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
          <div>
            <h2 className="text-lg font-medium text-brand-muted">Welcome back, Admin</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-brand-muted hover:text-brand-white relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-glass-border">
              <div className="w-10 h-10 rounded-full bg-brand-panel border border-brand-primary/30 flex items-center justify-center text-brand-primary font-bold">
                AD
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
