import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Zap, Shield, Truck, RotateCcw, ChevronDown } from 'lucide-react';
import ProductCard from '../Components/ProductCard';
import { useProducts } from '../Context/ProductContext';

const brandNames = ['Apple','Samsung','Sony','Dell','HP','Lenovo','Bose','JBL','Razer','Logitech','OnePlus','Xiaomi'];

const testimonials = [
  { name:'Mohana', city:'Chennai', rating:5, text:'Ordered a MacBook Pro — delivered next day in pristine condition. Best gadget shopping in India.', avatar:'M' },
  { name:'Dharun Prasath', city:'Coimbatore', rating:5, text:'AirPods 100% authentic. Support helped me choose the right model. Absolutely love Moprix!', avatar:'DP' },
  { name:'Vishvitha', city:'Bengaluru', rating:5, text:'6 orders, 0 issues. Always genuine, always fast. The packaging is premium every time.', avatar:'V' },
  { name:'Priya', city:'Pune', rating:5, text:'Got Sony WH-1000XM5 at ₹10k off. Unboxing felt like opening from Sony itself. Highly recommend!', avatar:'P' },
];

const features = [
  { icon: Truck,      title: 'Free Express Delivery', desc: 'Same-day in metros. Next-day everywhere.',      color: '#2563eb' },
  { icon: Shield,     title: '100% Genuine Products', desc: 'Sourced from authorised distributors only.',     color: '#22c55e' },
  { icon: Zap,        title: 'Flash Deals Daily',      desc: 'New deals every day — up to 40% off.',          color: '#f59e0b' },
  { icon: RotateCcw,  title: '15-Day Easy Returns',    desc: 'No questions asked. Full refund guaranteed.',   color: '#8b5cf6' },
];

const faqData = [
  { q: 'How fast will my order arrive?',          a: 'Same-day delivery in metro cities for orders placed before 12 PM. Next-day delivery across 50+ cities. Standard 2–5 business days elsewhere.' },
  { q: 'Are all products 100% genuine?',           a: 'Absolutely. Every product is sourced directly from the brand or their authorised Indian distributor. We never deal in grey-market or refurbished goods.' },
  { q: 'What is your return policy?',              a: 'We offer a hassle-free 15-day return policy. Items must be unused, in original packaging with all accessories and invoice included.' },
  { q: 'Do you offer EMI options?',                a: 'Yes! No-cost EMI available on orders above ₹5,000 with HDFC, ICICI, SBI, Axis, and Kotak credit cards.' },
  { q: 'How do I track my order?',                 a: 'Once dispatched, you\'ll receive an SMS and email with a live tracking link. You can also check the "My Orders" section in your account.' },
  { q: 'What warranty comes with products?',       a: 'All products include the full manufacturer warranty — typically 1 to 2 years depending on the brand. We assist with warranty claims at no charge.' },
];

function CountdownTimer() {
  const [time, setTime] = useState({ h: 5, m: 42, s: 17 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-1.5">
      {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
        <React.Fragment key={i}>
          <span
            className="font-black text-sm w-9 h-9 rounded-lg flex items-center justify-center font-mono text-white"
            style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)' }}
          >{v}</span>
          {i < 2 && <span className="text-secondary-400 font-bold text-sm">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: open ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)',
        border: open ? '1.5px solid rgba(37,99,235,0.2)' : '1.5px solid rgba(226,232,240,0.6)',
        boxShadow: open
          ? '0 8px 32px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        backdropFilter: 'blur(16px)',
      }}
      onClick={() => setOpen(v => !v)}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <span className={`font-semibold text-sm leading-snug ${open ? 'text-primary' : 'text-secondary-900'}`}>{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 transition-transform duration-300"
          style={{ color: open ? '#2563eb' : '#94a3b8', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm text-secondary-600 leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Homepage() {
  const { products, categories, bestSellers, newArrivals, flashDeals } = useProducts();
  const [activeTab, setActiveTab] = useState('bestsellers');
  const tabProducts = { bestsellers: bestSellers, newarrivals: newArrivals, featured: products.slice(0, 8) };

  return (
    <div className="overflow-x-hidden" style={{ background: 'transparent' }}>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[88vh] flex items-center overflow-hidden py-24"
        style={{ background: 'transparent' }}
      >
        <div className="container-custom px-4 sm:px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse2" />
                <span className="text-xs font-semibold text-primary">New Collection 2026 — Now Live</span>
              </div>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-secondary-900 leading-[1.05] mb-6">
                Premium Tech<br />
                <span style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  for Modern Life
                </span>
              </h1>
              <p className="text-secondary-600 text-lg leading-relaxed mb-8 max-w-lg">
                India's finest curated collection of smartphones, laptops, audio gear and smart devices. Genuine. Fast. Guaranteed.
              </p>
              {/* Shop Now — centered */}
              <div className="flex justify-center mb-10">
                <Link to="/shop"
                  className="btn btn-lg text-white font-semibold gap-2"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}
                >
                  Shop Now <ArrowRight size={18} />
                </Link>
              </div>

              {/* Stats — separate glass cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: '50K+', label: 'Happy Customers', icon: '😊' },
                  { value: '5K+',  label: 'Products',        icon: '📦' },
                  { value: '100%', label: 'Genuine',         icon: '✅' },
                  { value: '24h',  label: 'Delivery',        icon: '🚀' },
                ].map(({ value, label, icon }) => (
                  <div key={label}
                    className="flex flex-col items-center text-center p-4 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.75)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.85)',
                      boxShadow: '0 4px 16px rgba(37,99,235,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
                    }}
                  >
                    <span className="text-xl mb-1">{icon}</span>
                    <span className="font-black text-2xl text-primary leading-none">{value}</span>
                    <span className="text-xs text-secondary-500 font-medium mt-0.5">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Hero right: banner image ── */}
            <div className="hidden lg:flex justify-end animate-fade-in">
              <div className="relative w-full max-w-lg animate-float">
                <img
                  src="/hero-banner.jpeg"
                  alt="Moprix promotions"
                  className="w-full rounded-3xl object-cover"
                  style={{
                    boxShadow: '0 32px 80px rgba(37,99,235,0.15)',
                    border: '1px solid rgba(255,255,255,0.8)',
                  }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y py-5 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderColor: 'rgba(226,232,240,0.5)' }}>
        <div className="flex">
          <div className="flex gap-12 items-center animate-marquee whitespace-nowrap">
            {[...brandNames, ...brandNames].map((b, i) => (
              <span key={i} className="text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors cursor-default px-2">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-14 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)' }}>
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="p-5 flex flex-col items-center text-center gap-3 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
                backdropFilter: 'blur(16px)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)'; }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${color}15`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8)` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <p className="font-bold text-sm text-secondary-900">{title}</p>
                <p className="text-xs text-secondary-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section" style={{ background: 'transparent' }}>
        <div className="container-custom">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Browse by Category</p>
              <h2 className="section-title">Shop What You Love</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map(c => (
              <Link key={c.id} to={`/shop?category=${c.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-square transition-all hover:-translate-y-1"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,99,235,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
              >
                <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.1) 60%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-lg mb-0.5">{c.icon}</p>
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-xs text-slate-300">{c.count}+ models</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLASH DEALS ── */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)' }}>
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={20} className="text-yellow-500 fill-yellow-500" />
                <p className="font-bold text-yellow-600 uppercase tracking-widest text-sm">Flash Deals</p>
              </div>
              <h2 className="font-display font-black text-3xl text-secondary-900">Today's Best Offers</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-secondary-500 font-medium">Ends in:</span>
              <CountdownTimer />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {flashDeals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop?badge=SALE"
              className="btn btn-lg gap-2 text-white"
              style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}
            >
              View All Deals <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TABBED PRODUCTS ── */}
      <section className="section" style={{ background: 'transparent' }}>
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="section-title">Explore Products</h2>
              <p className="section-sub">Handpicked premium gadgets just for you</p>
            </div>
            <div className="flex gap-1 p-1 rounded-2xl self-start sm:self-end"
              style={{ background: 'rgba(248,250,252,0.9)', border: '1px solid rgba(226,232,240,0.7)' }}>
              {[['bestsellers','Best Sellers'],['newarrivals','New Arrivals'],['featured','Featured']].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={activeTab === key
                    ? { background: 'linear-gradient(135deg, #2563eb, #06b6d4)', color: '#fff', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }
                    : { color: '#64748b' }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {(tabProducts[activeTab] || []).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="btn btn-outline btn-lg gap-2">Browse All Products <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ── PROMO BANNERS ── */}
      <section className="py-10 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)' }}>
        <div className="container-custom grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl overflow-hidden relative h-48"
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)' }}>
            <div className="absolute inset-0 flex flex-col justify-center p-8">
              <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2">Limited Offer</p>
              <h3 className="font-display font-black text-2xl text-white mb-3">Up to 40% Off<br />on Laptops</h3>
              <Link to="/shop?category=laptops" className="btn btn-sm bg-white text-primary hover:bg-blue-50 self-start gap-1">Shop Now <ArrowRight size={14} /></Link>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden relative h-48"
            style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)' }}>
            <div className="absolute inset-0 flex flex-col justify-center p-8">
              <p className="text-xs font-bold text-cyan-100 uppercase tracking-widest mb-2">New Arrivals</p>
              <h3 className="font-display font-black text-2xl text-white mb-3">Latest Smartphones<br />Just Landed</h3>
              <Link to="/shop?category=smartphones" className="btn btn-sm bg-white text-cyan-700 hover:bg-cyan-50 self-start gap-1">Shop Now <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background: 'transparent' }}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Customer Reviews</p>
            <h2 className="section-title mb-2">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex">{[...Array(5)].map((_,i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}</div>
              <span className="font-black text-lg text-secondary-900">4.9</span>
              <span className="text-secondary-400 text-sm">from 12,000+ reviews</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(t => (
              <div key={t.name}
                className="p-5 rounded-2xl flex flex-col gap-3 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(226,232,240,0.6)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(16px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(37,99,235,0.10), inset 0 1px 0 rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)'; }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-secondary-900">{t.name}</p>
                    <p className="text-xs text-secondary-400">{t.city}</p>
                  </div>
                </div>
                <div className="flex">{[...Array(t.rating)].map((_,i) => <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-sm text-secondary-600 leading-relaxed italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)' }}>
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Got Questions?</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Everything you need to know about shopping at Moprix.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {faqData.map((item, i) => <FAQItem key={i} {...item} />)}
          </div>
          <div className="text-center">
            <p className="text-sm text-secondary-500 mb-4">Still have questions? We're happy to help.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/faq" className="btn btn-outline gap-2">View All FAQs <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn btn-ghost gap-2 text-secondary-600">Contact Support</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY CTA ── */}
      <section className="section" style={{ background: 'transparent' }}>
        <div className="container-custom">
          <div className="rounded-3xl overflow-hidden relative p-10 sm:p-14 text-center"
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.75)',
              boxShadow: '0 24px 64px rgba(37,99,235,0.10)',
            }}>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Bulk & Corporate</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-secondary-900 mb-4">Need a Bulk or Corporate Order?</h2>
              <p className="text-secondary-600 text-lg mb-8 max-w-xl mx-auto">Get exclusive pricing, dedicated support and custom delivery for your business. Fill out our enquiry form and we'll get back within 24 hours.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/enquiry"
                  className="btn btn-lg text-white gap-2"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}
                >
                  Submit Enquiry <ArrowRight size={18} />
                </Link>
                <Link to="/contact"
                  className="btn btn-lg gap-2"
                  style={{ background: 'rgba(248,250,252,0.9)', border: '1.5px solid rgba(226,232,240,0.8)', color: '#475569' }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
