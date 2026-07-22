import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-secondary-50 dark:bg-secondary-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-black text-xl shadow-float">M</div>
            <span className="font-display font-black text-2xl text-secondary-900 dark:text-white">Moprix</span>
          </Link>
          <h1 className="font-display font-black text-3xl text-secondary-900 dark:text-white mb-2">Forgot Password?</h1>
          <p className="text-secondary-500 text-sm max-w-xs mx-auto">No worries! Enter your email and we'll send you a reset link.</p>
        </div>

        <div className="card p-8 shadow-glass">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle size={56} className="text-success mx-auto mb-4" />
              <h3 className="font-bold text-xl text-secondary-900 dark:text-white mb-2">Check Your Inbox</h3>
              <p className="text-secondary-500 text-sm mb-6">We've sent a password reset link to <strong className="text-secondary-700 dark:text-secondary-300">{email}</strong>. It expires in 15 minutes.</p>
              <Link to="/login" className="btn btn-primary w-full">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input pl-10" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-full btn-lg">
                {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending…</span> : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-secondary-500 hover:text-primary transition-colors font-medium">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
