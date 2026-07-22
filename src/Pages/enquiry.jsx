import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Building2, User, Phone, Mail, Package, CheckCircle, Send, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../Services/api';

const glassCard = {
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
};

const SUBJECTS = [
  'Order Issue',
  'Product Enquiry',
  'Return / Refund',
  'Technical Support',
  'Partnership',
  'Other',
];

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  subject: 'Product Enquiry',
  message: '',
};

export default function Enquiry() {
  const [formData, setFormData] = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]       = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'Name is required';
    if (!formData.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email format';
    if (!formData.phone.trim())   e.phone   = 'Phone number is required';
    if (!formData.subject)        e.subject = 'Please select a subject';
    if (!formData.message.trim()) e.message = 'Message is required';
    else if (formData.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast.error('Please fill all required fields'); return; }
    setIsSubmitting(true);
    try {
      await api.post('/enquiries', {
        name:    formData.name,
        email:   formData.email,
        phone:   formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Enquiry submitted successfully!');
    } catch (err) {
      setIsSubmitting(false);
      const msg = err?.response?.data?.message || 'Submission failed. Please try again.';
      toast.error(msg);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen py-16 flex items-center" style={{ background: 'transparent' }}>
        <div className="container-custom px-4 sm:px-6 max-w-2xl">
          <div className="p-12 text-center rounded-3xl" style={glassCard}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <CheckCircle className="text-emerald-600" size={40} />
            </div>
            <h1 className="font-display font-black text-3xl text-secondary-900 mb-4">Enquiry Submitted!</h1>
            <p className="text-secondary-600 text-lg mb-8">
              Thank you! Our team will review your enquiry and get back to you within 24–48 business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                Return to Home
              </Link>
              <button onClick={() => { setSubmitted(false); setFormData(EMPTY); }} className="btn btn-outline">
                Submit Another Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="min-h-screen py-16" style={{ background: 'transparent' }}>
      <div className="container-custom px-4 sm:px-6 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
            <MessageSquare className="text-primary" size={32} />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-secondary-900 mb-4">
            Bulk &amp; Corporate Enquiry
          </h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Planning a bulk purchase or corporate partnership? Fill out the form and our team will get back to you with exclusive offers.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Package,      title: 'Bulk Discounts',    desc: 'Up to 25% off on large orders',  color: '#2563eb' },
            { icon: Building2,    title: 'Corporate Pricing', desc: 'Special B2B pricing tiers',       color: '#22c55e' },
            { icon: Send,         title: 'Priority Support',  desc: 'Dedicated account manager',       color: '#f59e0b' },
          ].map((b, i) => (
            <div key={i} className="p-5 text-center rounded-2xl transition-all hover:-translate-y-1 duration-300" style={glassCard}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                style={{ background: `${b.color}15` }}>
                <b.icon style={{ color: b.color }} size={24} />
              </div>
              <h3 className="font-bold text-secondary-900 mb-1">{b.title}</h3>
              <p className="text-sm text-secondary-500">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl" style={glassCard}>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Section heading */}
            <div className="md:col-span-2">
              <h2 className="font-display font-bold text-xl text-secondary-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" /> Contact Information
              </h2>
            </div>

            {/* Name */}
            <div>
              <label className="label">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Your full name"
                  className={`input pl-10 ${errors.name ? 'input-error' : ''}`} />
              </div>
              {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="you@company.com"
                  className={`input pl-10 ${errors.email ? 'input-error' : ''}`} />
              </div>
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="label">Phone Number *</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`input pl-10 ${errors.phone ? 'input-error' : ''}`} />
              </div>
              {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="label">Subject *</label>
              <select name="subject" value={formData.subject} onChange={handleChange}
                className={`input ${errors.subject ? 'input-error' : ''}`}>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.subject && <p className="text-danger text-xs mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="label">Message * <span className="text-secondary-400 font-normal">(min 20 characters)</span></label>
              <textarea name="message" value={formData.message} onChange={handleChange}
                rows={5} maxLength={1000}
                placeholder="Describe your requirements in detail…"
                className={`input resize-none ${errors.message ? 'input-error' : ''}`} />
              <div className="flex justify-between mt-1">
                {errors.message
                  ? <p className="text-danger text-xs">{errors.message}</p>
                  : <span />}
                <span className="text-xs text-slate-400">{formData.message.length}/1000</span>
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button type="submit" disabled={isSubmitting}
                className="btn btn-lg w-full text-white gap-2"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                {isSubmitting
                  ? <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  : <><Send size={18} /> Submit Enquiry</>}
              </button>
            </div>
          </div>
        </form>

        {/* Info note */}
        <div className="mt-8 p-5 rounded-2xl text-center"
          style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.15)' }}>
          <p className="text-sm text-secondary-600">
            <AlertCircle size={14} className="inline mr-1.5 text-primary" />
            Our team typically responds within <strong>24 business hours</strong>. For urgent enquiries, call{' '}
            <a href="tel:+919876543210" className="text-primary font-bold hover:underline">+91 98765 43210</a>
          </p>
        </div>
      </div>
    </div>
  );
}
