import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
  Menu, X, ChevronRight, LogOut, BarChart3, MessageSquare,
  FileText, Bell, Home, Box,
} from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminCustomers from './AdminCustomers';
import AdminSettings from './AdminSettings';
import AdminEnquiries from './AdminEnquiries';
import AdminApplications from './AdminApplications';

const menuItems = [
  { text: 'Dashboard',  icon: LayoutDashboard, path: '/admin' },
  { text: 'Products',   icon: Package,          path: '/admin/products' },
  { text: 'Orders',     icon: ShoppingCart,     path: '/admin/orders' },
  { text: 'Customers',  icon: Users,            path: '/admin/customers' },
  { text: 'Analytics',  icon: BarChart3,        path: '/admin/analytics' },
  { text: 'Enquiries',  icon: MessageSquare,    path: '/admin/enquiries' },
  { text: 'Applications', icon: FileText,       path: '/admin/applications' },
  { text: 'Settings',   icon: Settings,         path: '/admin/settings' },
];

const sidebarStyle = {
  background: 'rgba(15,23,42,0.97)',
  backdropFilter: 'blur(24px)',
  borderRight: '1px solid rgba(255,255,255,0.07)',
};

const contentStyle = {
  background: 'rgba(248,250,255,0.55)',
  backdropFilter: 'blur(8px)',
};

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(path);

  const handleLogout = () => { logout(); navigate('/'); };

  const Sidebar = () => (
    <aside style={sidebarStyle} className="w-64 h-full flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
            style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
            M
          </div>
          <div>
            <span className="font-display font-black text-xl text-white">Moprix</span>
            <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => (
          <Link key={item.text} to={item.path}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
            style={isActive(item.path)
              ? { background: 'linear-gradient(135deg,#2563eb,#06b6d4)', color: '#fff', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }
              : { color: '#94a3b8' }}
            onMouseEnter={e => { if (!isActive(item.path)) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
            onMouseLeave={e => { if (!isActive(item.path)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}>
            <item.icon size={18} />
            <span className="flex-1">{item.text}</span>
            {isActive(item.path) && <ChevronRight size={14} />}
          </Link>
        ))}

        <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '8px' }}>
          <Link to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 transition-all"
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
            <Home size={18} /> Visit Store
          </Link>
        </div>
      </nav>

      {/* User */}
      <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-3 p-3 rounded-xl mb-3"
          style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)' }}>
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-400 font-medium transition-all"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#f87171'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f87171'; }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex" style={{ background: 'transparent' }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:sticky lg:top-0 lg:h-screen">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <div className={`fixed top-0 left-0 h-full z-50 lg:hidden flex transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
        <button onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-white"
          style={{ background: 'rgba(255,255,255,0.1)' }}>
          <X size={18} />
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center gap-4 px-6 flex-shrink-0 sticky top-0 z-30"
          style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(226,232,240,0.5)', boxShadow: '0 1px 0 rgba(226,232,240,0.4)' }}>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-xl text-secondary-600 hover:bg-slate-100">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-lg text-secondary-900 leading-tight">
              {menuItems.find(m => isActive(m.path))?.text || 'Admin'}
            </h1>
            <p className="text-xs text-secondary-400">Moprix Admin Panel</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-secondary-500 hover:bg-slate-100 transition-all">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)' }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="analytics" element={<AdminDashboard />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-64 gap-4">
                <div className="text-5xl">🚧</div>
                <h2 className="font-bold text-xl text-secondary-900">Coming Soon</h2>
                <p className="text-secondary-500">This section is under construction.</p>
                <Link to="/admin" className="btn btn-primary">Back to Dashboard</Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}
