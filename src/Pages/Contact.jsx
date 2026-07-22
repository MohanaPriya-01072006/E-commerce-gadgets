import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../Services/api';

const glassCard = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: '1rem',
};

const contactCards = [
  { icon: MapPin, title: 'Visit Us',       lines: ['MG Road, Indiranagar', 'Bangalore, Karnataka 560001'], color: '#2563eb' },
  { icon: Phone,  title: 'Call Us',        lines: ['+91 98765 43210', 'Toll-free: 1800-123-4567'],          color: '#22c55e' },
  { icon: Mail,   title: 'Email Us',       lines: ['support@moprix.in', 'business@moprix.in'],               color: '#f59e0b' },
  { icon: Clock,  title: 'Working Hours',  lines: ['Mon–Fri: 9 AM – 8 PM', 'Sat: 10 AM – 6 PM'],           color: '#8b5cf6' },
];

const topics = ['Order Issue','Product Enquiry','Return / Refund','Technical Support','Partnership','Other'];

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Name is required';
  if (!f.email.trim()) e.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Invalid email';
  if (!f.subject) e.subject = 'Please select a topic';
  if (!f.message.trim()) e.message = 'Message is required';
  else if (f.message.trim().length < 20) e.message = 'Minimum 20 characters';
  return e;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const set = k => e => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true); setApiError('');
    try {
      await api.post('/enquiries', {
        name: form.name.trim(), email: form.email.trim(),
        phone: form.phone.trim(), subject: form.subject, message: form.message.trim(),
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)' }}>
        <div className="absolute top-8 left-16 w-14 h-14 rounded-full hidden sm:block opacity-40"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(37,99,235,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.25)' }} />
        <div className="absolute bottom-8 right-20 w-20 h-20 rounded-full hidden sm:block opacity-30"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4), rgba(6,182,212,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.2)' }} />
        <div className="container-custom max-w-2xl relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-blue-200 uppercase tracking-widest mb-4"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            Get In Touch
          </span>
          <h1 className="font-display font-black text-5xl text-white mb-4">We're Here to Help</h1>
          <p className="text-slate-300 text-lg">Our support team is available 6 days a week. We typically respond within 2 hours.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-10 px-4 bg-white border-b border-slate-100">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map(({ icon: Icon, title, lines, color }) => (
            <div key={title}
              className="p-5 text-center rounded-2xl transition-all duration-300 cursor-default"
              style={glassCard}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = glassCard.boxShadow; }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${color}15` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <p className="font-bold text-secondary-900 mb-1.5">{title}</p>
              {lines.map(l => <p key={l} className="text-xs text-secondary-500">{l}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="section px-4"
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)' }}>
        <div className="container-custom grid lg:grid-cols-2 gap-12">

          {/* Form */}
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Send a Message</span>
            <h2 className="section-title mb-8">How Can We Help You?</h2>
            {success ? (
              <div className="p-10 text-center rounded-2xl" style={{ ...glassCard, border: '2px solid rgba(34,197,94,0.2)' }}>
                <CheckCircle size={56} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="font-bold text-2xl text-secondary-900 mb-2">Message Sent!</h3>
                <p className="text-secondary-500 mb-6">Our team will reply within 2 business hours.</p>
                <button onClick={() => setSuccess(false)}
                  className="btn text-white"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl" style={glassCard}>
                {apiError && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl mb-5 text-sm font-medium text-red-600"
                    style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <AlertCircle size={16} />{apiError}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="label">Full Name *</label>
                    <input value={form.name} onChange={set('name')} className={`input ${errors.name ? 'input-error' : ''}`} placeholder="Rahul Sharma" />
                    {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input type="email" value={form.email} onChange={set('email')} className={`input ${errors.email ? 'input-error' : ''}`} placeholder="you@email.com" />
                    {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label">Phone (optional)</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} className="input" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="label">Topic *</label>
                    <select value={form.subject} onChange={set('subject')} className={`input ${errors.subject ? 'input-error' : ''}`}>
                      <option value="">Select a topic</option>
                      {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.subject && <p className="text-xs text-danger mt-1">{errors.subject}</p>}
                  </div>
                </div>
                <div className="mb-5">
                  <label className="label">Message *</label>
                  <textarea value={form.message} onChange={set('message')} rows={5} maxLength={500}
                    placeholder="Describe your issue or question…" className={`input resize-none ${errors.message ? 'input-error' : ''}`} />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-danger">{errors.message}</span>
                    <span className="text-xs text-slate-400">{form.message.length}/500</span>
                  </div>
                </div>
                <button type="submit" disabled={submitting}
                  className="btn w-full btn-lg text-white gap-2"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                  {submitting
                    ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending…</span>
                    : <><Send size={18} />Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Map + channels */}
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Find Us</span>
            <h2 className="section-title mb-6">Our Location</h2>
            <div className="h-64 flex items-center justify-center flex-col gap-3 mb-6 rounded-2xl"
              style={{ ...glassCard, background: 'rgba(248,250,252,0.9)' }}>
              <MapPin size={40} className="text-primary" />
              <p className="font-semibold text-secondary-700">MG Road, Bangalore</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                Open in Google Maps
              </a>
            </div>
            <div className="p-5 rounded-2xl" style={glassCard}>
              <p className="font-bold text-secondary-900 mb-4">Quick Response Channels</p>
              {[
                { icon: '💬', label: 'Live Chat',      desc: 'Mon–Sat, 9 AM–8 PM' },
                { icon: '📧', label: 'Email Support',  desc: 'Reply within 2 hours' },
                { icon: '📞', label: 'Phone',          desc: '+91 98765 43210' },
              ].map((ch, i, arr) => (
                <div key={ch.label}>
                  <div className="flex items-center gap-3 py-3">
                    <span className="text-xl">{ch.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-secondary-900">{ch.label}</p>
                      <p className="text-xs text-secondary-400">{ch.desc}</p>
                    </div>
                    <button className="btn btn-ghost btn-sm text-primary">Connect</button>
                  </div>
                  {i < arr.length - 1 && <div className="border-t border-slate-100" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
