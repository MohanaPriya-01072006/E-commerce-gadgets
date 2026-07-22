import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

function PasswordStrength({ password }) {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length;
  const colors = ['', '#ef4444', '#f59e0b', '#06b6d4', '#22c55e'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  if (!password) return null;
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex-1 h-1.5 rounded-full transition-all"
            style={{ background: i <= score ? colors[score] : '#e2e8f0' }} />
        ))}
      </div>
      <span className="text-xs font-semibold" style={{ color: colors[score] }}>{labels[score]}</span>
    </div>
  );
}

const perks = ['Track orders in real time', 'Save items to wishlist', 'Exclusive member-only deals', 'One-tap checkout'];

const sphereBg = 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6), rgba(37,99,235,0.15))';
const sphereShadow = 'inset 2px 3px 8px rgba(255,255,255,0.5), 0 8px 24px rgba(37,99,235,0.12)';

export default function Signup() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [show, setShow] = useState({ pwd: false, conf: false });
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setApiErr('');
    const result = await register(form.name, form.email, form.password);
    if (result.success) navigate('/');
    else setApiErr(result.message);
  };

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(p => ({ ...p, [k]: '' })); };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #f8faff 50%, #f0faff 100%)' }}>

      {/* Glass spheres */}
      <div className="animate-float-slow hidden sm:block" style={{ position:'absolute', width:100, height:100, borderRadius:'50%', top:'8%', right:'5%', background: sphereBg, boxShadow: sphereShadow, border:'1px solid rgba(255,255,255,0.5)' }} />
      <div className="animate-float" style={{ position:'absolute', width:60, height:60, borderRadius:'50%', top:'20%', left:'4%', background: sphereBg, boxShadow: sphereShadow, border:'1px solid rgba(255,255,255,0.5)', animationDelay:'1s' }} />
      <div className="animate-float-slow" style={{ position:'absolute', width:80, height:80, borderRadius:'50%', bottom:'12%', right:'8%', background: sphereBg, boxShadow: sphereShadow, border:'1px solid rgba(255,255,255,0.5)', animationDelay:'0.5s' }} />
      <div className="animate-float hidden lg:block" style={{ position:'absolute', width:44, height:44, borderRadius:'50%', bottom:'20%', left:'5%', background: sphereBg, boxShadow: sphereShadow, border:'1px solid rgba(255,255,255,0.5)', animationDelay:'1.5s' }} />

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center z-10">

        {/* Left panel */}
        <div className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl"
              style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.35)' }}>
              M
            </div>
            <span className="font-display font-black text-2xl text-secondary-900">Moprix</span>
          </Link>
          <h2 className="font-display font-black text-4xl text-secondary-900 leading-tight mb-4">
            Join 50,000+<br />happy shoppers.
          </h2>
          <p className="text-secondary-500 mb-8 leading-relaxed">Create your free account and unlock the best premium tech shopping experience in India.</p>
          <div className="space-y-3">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                <span className="text-secondary-600 font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          <div className="text-center lg:text-left mb-6">
            <div className="lg:hidden flex justify-center mb-4">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}>
                  M
                </div>
                <span className="font-display font-black text-xl text-secondary-900">Moprix</span>
              </Link>
            </div>
            <h1 className="font-display font-black text-3xl text-secondary-900 mb-1">Create Account</h1>
            <p className="text-secondary-500 text-sm">Free forever. Takes less than a minute.</p>
          </div>

          <div className="p-7 rounded-3xl"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 2px 0 rgba(255,255,255,0.9) inset, 0 20px 60px rgba(0,0,0,0.08)',
            }}>
            {apiErr && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl mb-5 text-sm font-medium text-red-600"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <AlertCircle size={16} />{apiErr}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <div className="relative"><User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rahul Sharma" className={`input pl-10 ${errors.name ? 'input-error' : ''}`} />
                </div>
                {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Email Address</label>
                <div className="relative"><Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" className={`input pl-10 ${errors.email ? 'input-error' : ''}`} />
                </div>
                {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Password</label>
                <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type={show.pwd ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min. 8 characters" className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`} />
                  <button type="button" onClick={() => setShow(p => ({ ...p, pwd: !p.pwd }))} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary-700 transition-colors">
                    {show.pwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-danger mt-1">{errors.password}</p>}
                <PasswordStrength password={form.password} />
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type={show.conf ? 'text' : 'password'} value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Re-enter password" className={`input pl-10 pr-10 ${errors.confirm ? 'input-error' : ''}`} />
                  <button type="button" onClick={() => setShow(p => ({ ...p, conf: !p.conf }))} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary-700 transition-colors">
                    {show.conf ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirm && <p className="text-xs text-danger mt-1">{errors.confirm}</p>}
              </div>
              <p className="text-xs text-secondary-400">
                By creating an account you agree to our{' '}
                <Link to="/terms" className="text-primary font-semibold hover:underline">Terms</Link> and{' '}
                <Link to="/privacy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>.
              </p>
              <button type="submit" disabled={loading}
                className="btn w-full btn-lg text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                {loading
                  ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating…</span>
                  : 'Create Free Account'}
              </button>
            </form>
          </div>
          <p className="text-center text-sm text-secondary-500 mt-5">
            Already have an account?{' '}<Link to="/login" className="text-primary font-bold hover:underline">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
