import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, User, Shield } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';

/* ── Default admin credentials ── */
const ADMIN_EMAIL    = 'admin@moprix.in';

const glass = {
  background: 'rgba(255,255,255,0.82)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 2px 0 rgba(255,255,255,0.9) inset, 0 24px 64px rgba(37,99,235,0.10), 0 4px 16px rgba(0,0,0,0.06)',
};

export default function Login() {
  const { login, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [mode, setMode]     = useState('user');   // 'user' | 'admin'
  const [form, setForm]     = useState({ email: '', password: '' });
  const [show, setShow]     = useState(false);
  const [error, setError]   = useState('');
  const [busy, setBusy]     = useState(false);

  const set = (k) => (e) => { setForm(p => ({ ...p, [k]: e.target.value })); setError(''); };

  /* ── Admin login (authenticates against the backend) ── */
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const result = await login(form.email, form.password);
    setBusy(false);
    if (result.success) {
      const userInfoStr = localStorage.getItem('userInfo');
      const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
      if (userInfo && userInfo.isAdmin) {
        toast.success('Welcome back, Admin!');
        window.location.href = '/admin';   /* hard reload so AuthContext picks up localStorage */
      } else {
        logout();
        setError('Access denied. You are not authorized as an admin.');
      }
    } else {
      setError(result.message || 'Invalid admin credentials.');
    }
  };

  /* ── Regular user login ── */
  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const result = await login(form.email, form.password);
    setBusy(false);
    if (result.success) {
      toast.success('Welcome back!');
      navigate(redirect);
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }
  };

  const isLoading = loading || busy;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 relative"
      style={{ background: 'transparent' }}
    >
      <div className="relative w-full max-w-md z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl"
              style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
              M
            </div>
            <span className="font-display font-black text-2xl text-secondary-900">Moprix</span>
          </Link>
          <h1 className="font-display font-black text-3xl text-secondary-900 mb-2">Sign In</h1>
          <p className="text-secondary-500 text-sm">Access your account or admin panel</p>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 p-1.5 rounded-2xl mb-6"
          style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.7)' }}>
          <button
            onClick={() => { setMode('user'); setForm({ email: '', password: '' }); setError(''); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={mode === 'user'
              ? { background: 'linear-gradient(135deg,#2563eb,#06b6d4)', color: '#fff', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }
              : { color: '#64748b' }}
          >
            <User size={15} /> Customer Login
          </button>
          <button
            onClick={() => { setMode('admin'); setForm({ email: ADMIN_EMAIL, password: '' }); setError(''); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={mode === 'admin'
              ? { background: 'linear-gradient(135deg,#7c3aed,#2563eb)', color: '#fff', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }
              : { color: '#64748b' }}
          >
            <Shield size={15} /> Admin Login
          </button>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl" style={glass}>

          {mode === 'admin' && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl mb-5 text-sm"
              style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.18)' }}>
              <Shield size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#7c3aed' }} />
              <div>
                <p className="font-bold text-purple-700">Admin access only</p>
                <p className="text-xs text-purple-600 mt-0.5">Use your Moprix admin credentials to access the dashboard.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl mb-5 text-sm font-medium text-red-600"
              style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <AlertCircle size={16} className="flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={mode === 'admin' ? handleAdminLogin : handleUserLogin} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required value={form.email} onChange={set('email')}
                  placeholder={mode === 'admin' ? 'admin@moprix.in' : 'you@example.com'}
                  className="input pl-10" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="label mb-0">Password</label>
                {mode === 'user' && (
                  <Link to="/forgot-password" className="text-xs text-primary font-semibold hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={show ? 'text' : 'password'} required value={form.password} onChange={set('password')}
                  placeholder="••••••••" className="input pl-10 pr-10" />
                <button type="button" onClick={() => setShow(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary-700 transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {mode === 'admin' && (
                <p className="text-xs text-slate-400 mt-1.5">
                  Hint: <span className="font-mono font-bold text-purple-500">Admin@123</span>
                </p>
              )}
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full btn btn-lg text-white font-semibold mt-2"
              style={mode === 'admin'
                ? { background: 'linear-gradient(135deg,#7c3aed,#2563eb)', boxShadow: '0 8px 24px rgba(124,58,237,0.3)' }
                : { background: 'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }
              }>
              {isLoading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in…</span>
                : mode === 'admin' ? '🔐 Enter Admin Panel' : 'Sign In'}
            </button>
          </form>

          {mode === 'user' && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[['G','Google'],['f','Facebook']].map(([icon, label]) => (
                  <button key={label}
                    className="btn gap-2 justify-center py-2.5 text-secondary-700 font-semibold"
                    style={{ background: 'rgba(248,250,252,0.8)', border: '1.5px solid rgba(226,232,240,0.8)' }}>
                    <span className="font-black text-sm">{icon}</span> {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {mode === 'user' && (
          <p className="text-center text-sm text-secondary-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline">Create one free →</Link>
          </p>
        )}
      </div>
    </div>
  );
}
