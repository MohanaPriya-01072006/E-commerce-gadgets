import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Heart, User, ChevronDown, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import { categories } from '../Data/products';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const searchRef = useRef();
  const userMenuRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setCatMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* Promo Bar */}
      <div
        className="text-white text-xs font-semibold text-center py-2 tracking-wide"
        style={{ background: 'linear-gradient(90deg, #1e3a8a, #2563eb, #0891b2)' }}
      >
        🚀 FREE EXPRESS DELIVERY on orders over ₹10,000 &nbsp;|&nbsp; Use code{' '}
        <span className="bg-white/20 px-2 py-0.5 rounded ml-1 font-bold">MOPRIX10</span>{' '}
        for 10% off
      </div>

      {/* Main Header */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.92)'
            : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(226,232,240,0.6)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(0,0,0,0.06), inset 0 -1px 0 rgba(226,232,240,0.5)'
            : '0 1px 0 rgba(226,232,240,0.5)',
        }}
      >
        <div className="container-custom px-4 sm:px-6 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                boxShadow: '0 4px 12px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              M
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-black text-xl text-secondary-900 tracking-tight">Moprix</span>
              <span className="block text-[9px] text-secondary-400 font-medium tracking-widest uppercase -mt-0.5">Gadgets & Tech</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(l.to)
                    ? 'bg-primary/8 text-primary font-semibold'
                    : 'text-secondary-600 hover:text-primary hover:bg-slate-50'
                }`}
                style={isActive(l.to) ? { background: 'rgba(37,99,235,0.08)' } : {}}>
                {l.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative" onMouseEnter={() => setCatMenuOpen(true)} onMouseLeave={() => setCatMenuOpen(false)}>
              <button className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium text-secondary-600 hover:text-primary hover:bg-slate-50 transition-all">
                Categories <ChevronDown size={14} className={`transition-transform ${catMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {catMenuOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-72 rounded-2xl p-2 grid grid-cols-2 gap-1 animate-fade-in z-50"
                  style={{
                    background: 'rgba(255,255,255,0.96)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(226,232,240,0.7)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
                  }}
                >
                  {categories.map(c => (
                    <Link key={c.id} to={`/shop?category=${c.slug}`}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all text-sm text-secondary-700 font-medium"
                      style={{ transition: 'all 0.15s ease' }}>
                      <span className="text-lg">{c.icon}</span> {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar (desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm items-center relative">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search gadgets, brands…"
              className="w-full pl-4 pr-10 py-2 rounded-xl text-sm text-secondary-900 placeholder-slate-400 focus:outline-none transition-all"
              style={{
                background: 'rgba(248,250,252,0.9)',
                border: '1.5px solid rgba(226,232,240,0.8)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
              }}
              onFocus={e => {
                e.target.style.background = '#fff';
                e.target.style.borderColor = '#2563eb';
                e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
              }}
              onBlur={e => {
                e.target.style.background = 'rgba(248,250,252,0.9)';
                e.target.style.borderColor = 'rgba(226,232,240,0.8)';
                e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)';
              }}
            />
            <button type="submit" className="absolute right-3 text-slate-400 hover:text-primary transition-colors">
              <Search size={16} />
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Search toggle (mobile) */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-secondary-600 hover:text-primary hover:bg-slate-50 transition-all"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link to="/shop" className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-secondary-600 hover:text-primary hover:bg-slate-50 transition-all">
              <Heart size={19} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative w-9 h-9 rounded-xl flex items-center justify-center text-secondary-600 hover:text-primary hover:bg-slate-50 transition-all">
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-all"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}
                  >
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-secondary-700 max-w-[80px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className={`text-secondary-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-2xl py-2 animate-fade-in z-50"
                    style={{
                      background: 'rgba(255,255,255,0.97)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(226,232,240,0.7)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
                    }}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="font-semibold text-sm text-secondary-900 truncate">{user?.name}</p>
                      <p className="text-xs text-secondary-400 truncate">{user?.email}</p>
                    </div>
                    {[
                      { icon: Package, label: 'My Orders', to: '/my-orders' },
                      ...(isAdmin ? [{ icon: LayoutDashboard, label: 'Admin Panel', to: '/admin' }] : []),
                    ].map(item => (
                      <Link key={item.to} to={item.to}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-secondary-700 hover:bg-primary/5 hover:text-primary transition-all"
                        style={{ transition: 'all 0.15s ease' }}>
                        <item.icon size={16} /> {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition-all mt-1 border-t border-slate-100"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm text-secondary-600">Sign In</Link>
                <Link
                  to="/signup"
                  className="btn btn-sm text-white font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                    boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-secondary-600 hover:text-primary hover:bg-slate-50 transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 animate-slide-up">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search gadgets, brands…"
                className="input flex-1 text-sm"
              />
              <button type="submit" className="btn btn-primary btn-sm px-4"><Search size={16} /></button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 shadow-glass-lg transform transition-transform duration-300 lg:hidden overflow-y-auto ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(32px)',
          borderLeft: '1px solid rgba(226,232,240,0.6)',
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}
            >
              M
            </div>
            <span className="font-display font-black text-lg text-secondary-900">Moprix</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-xl flex items-center justify-center text-secondary-500 hover:text-secondary-900 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-1">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(l.to)
                  ? 'text-white'
                  : 'text-secondary-700 hover:bg-slate-50 hover:text-primary'
              }`}
              style={isActive(l.to) ? { background: 'linear-gradient(135deg, #2563eb, #06b6d4)' } : {}}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <p className="px-4 py-1 text-xs font-bold text-secondary-400 uppercase tracking-wider">Categories</p>
          </div>
          {categories.slice(0, 8).map(c => (
            <Link key={c.id} to={`/shop?category=${c.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-secondary-700 hover:bg-slate-50 hover:text-primary transition-all">
              <span className="text-base">{c.icon}</span> {c.name}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 mt-2 space-y-2">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}
                >
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm text-secondary-900">{user?.name}</p>
                  <p className="text-xs text-secondary-400">{user?.email}</p>
                </div>
              </div>
              <Link to="/my-orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-secondary-700 hover:bg-slate-50 transition-all">
                <Package size={16} />My Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-secondary-700 hover:bg-slate-50 transition-all">
                  <LayoutDashboard size={16} />Admin Panel
                </Link>
              )}
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-danger hover:bg-red-50 transition-all">
                <LogOut size={16} />Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline w-full">Sign In</Link>
              <Link
                to="/signup"
                className="btn w-full text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
