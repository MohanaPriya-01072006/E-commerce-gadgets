import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Award, Zap, Heart, Globe, Shield, ArrowRight } from 'lucide-react';

const glassCard = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: '1rem',
};

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '5K+',  label: 'Products' },
  { value: '120+', label: 'Brand Partners' },
  { value: '4.9★', label: 'Avg Rating' },
];

const values = [
  { icon: Target, title: 'Customer First',    desc: 'Every decision starts with your experience. From UX to delivery, you drive us.',                        color: '#2563eb' },
  { icon: Shield, title: '100% Genuine',      desc: 'Sourced directly from authorised distributors. Every product has original manufacturer warranty.',          color: '#22c55e' },
  { icon: Zap,    title: 'Speed & Reliability', desc: 'Same-day dispatch in metros. Real-time tracking on every order.',                                         color: '#f59e0b' },
  { icon: Heart,  title: 'Always Available',  desc: 'Round-the-clock support — 365 days a year. No bots, just humans.',                                          color: '#ec4899' },
  { icon: Globe,  title: 'Sustainable',       desc: '100% recyclable packaging and committed to carbon-neutral by 2027.',                                        color: '#06b6d4' },
  { icon: Award,  title: 'Award Winning',     desc: "Voted India's best gadget store 3 years running.",                                                          color: '#8b5cf6' },
];

const team = [
  { name: 'Rahul Menon',   role: 'Founder & CEO',     bio: 'Ex-Amazon product lead. 12 years in e-commerce.',          avatar: 'RM' },
  { name: 'Divya Kapoor',  role: 'CTO',               bio: 'Full-stack engineer turned tech founder.',                  avatar: 'DK' },
  { name: 'Sameer Joshi',  role: 'Head of Sourcing',  bio: 'Former Samsung India partnerships manager.',                avatar: 'SJ' },
  { name: 'Ananya Nair',   role: 'Head of Support',   bio: "Built Moprix's legendary support culture.",                 avatar: 'AN' },
];

const timeline = [
  { year: '2022', event: 'Moprix founded in Bangalore with 12 products and a big dream.' },
  { year: '2023', event: 'Crossed ₹10 Cr revenue. Launched same-day delivery in 8 cities.' },
  { year: '2024', event: '100+ brand partners. 25,000 happy customers.' },
  { year: '2025', event: 'Mobile app launched. Expanded to 50+ cities.' },
  { year: '2026', event: '50K+ customers, 5K+ products, still growing.' },
];

export default function About() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="py-24 px-4 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)' }}>
        {/* Glass spheres */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full hidden lg:block opacity-40"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(37,99,235,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.25)' }} />
        <div className="absolute bottom-10 right-16 w-28 h-28 rounded-full hidden lg:block opacity-30"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4), rgba(6,182,212,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.2)' }} />
        <div className="container-custom relative z-10 max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-blue-200 uppercase tracking-widest mb-4"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            Our Story
          </span>
          <h1 className="font-display font-black text-5xl sm:text-6xl text-white leading-tight mb-5">
            We're on a mission to make{' '}
            <span style={{ background: 'linear-gradient(90deg, #93c5fd, #67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              premium tech
            </span>
            {' '}accessible to all.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Founded in Bangalore in 2022, Moprix was born from a frustration — why is buying genuine, top-quality tech in India so hard? We set out to fix that.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white border-b border-slate-100">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-black text-4xl text-primary mb-1">{s.value}</p>
              <p className="text-secondary-500 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)' }}>
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">Who We Are</span>
            <h2 className="section-title mb-5">Built by tech lovers,<br />for tech lovers.</h2>
            {[
              'Moprix started when three friends — frustrated by counterfeit products, terrible delivery, and zero after-sales support — decided to build the store they always wished existed.',
              'Today we curate thousands of products across smartphones, laptops, audio, and wearables. Every single item is sourced directly from the brand or their authorised distributor.',
              "We believe technology should empower your life, not frustrate it. That's why we obsess over every detail — from packaging to post-sale support.",
            ].map((t, i) => (
              <p key={i} className="text-secondary-600 leading-relaxed mb-3 text-sm">{t}</p>
            ))}
          </div>
          <div className="rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.10)' }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team"
              className="w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Our Journey</span>
            <h2 className="section-title">From Idea to India's Favourite</h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-100" />
            {timeline.map(t => (
              <div key={t.year} className="relative flex gap-5 mb-6 pl-14">
                <div className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                  {t.year.slice(2)}
                </div>
                <div className="p-4 flex-1 rounded-xl" style={glassCard}>
                  <p className="text-xs font-bold text-primary mb-1">{t.year}</p>
                  <p className="text-sm text-secondary-700">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)' }}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title}
                className="p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={glassCard}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = glassCard.boxShadow; }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${color}15` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">{title}</h3>
                <p className="text-sm text-secondary-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">The People</span>
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(m => (
              <div key={m.name}
                className="p-6 text-center rounded-2xl transition-all duration-300 cursor-default"
                style={glassCard}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = glassCard.boxShadow; }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.25)' }}>
                  {m.avatar}
                </div>
                <p className="font-bold text-secondary-900">{m.name}</p>
                <p className="text-xs text-primary font-semibold mb-2">{m.role}</p>
                <p className="text-xs text-secondary-500">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)' }}>
        <div className="container-custom max-w-xl">
          <h2 className="font-display font-black text-4xl text-white mb-4">Ready to explore?</h2>
          <p className="text-slate-300 mb-8">Thousands of genuine products. Delivered fast. Backed by the best support in India.</p>
          <Link to="/shop"
            className="btn btn-lg text-white gap-2"
            style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}>
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
