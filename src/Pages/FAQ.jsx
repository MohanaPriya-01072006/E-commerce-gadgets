import React, { useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const glassCard = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
};

const faqData = {
  Orders: [
    { q: 'How do I track my order?', a: "Once dispatched, you'll get an SMS and email with a tracking link. You can also check the 'My Orders' section in your account." },
    { q: 'Can I cancel or modify my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. Contact support immediately at support@moprix.in.' },
    { q: 'How long does delivery take?', a: 'Same-day delivery in metro cities for orders before 12 PM. Next-day for 50+ cities. Standard 2–5 business days elsewhere.' },
    { q: 'Do you offer free shipping?', a: 'Yes! All orders above ₹10,000 get free express delivery. Below ₹10,000, a flat ₹299 shipping fee applies.' },
  ],
  Products: [
    { q: 'Are all products genuine?', a: 'Absolutely. Every product is sourced directly from the brand or their authorised Indian distributor. We never deal in grey-market goods.' },
    { q: 'Do products come with warranty?', a: 'Yes. All products include the full standard manufacturer warranty — typically 1 to 2 years depending on brand and product type.' },
    { q: 'What brands do you carry?', a: 'We carry 120+ brands including Apple, Samsung, Sony, OnePlus, Xiaomi, Bose, JBL, Dell, HP, Lenovo, Razer, Logitech, and many more.' },
  ],
  Payments: [
    { q: 'What payment methods do you accept?', a: 'Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (GPay, PhonePe, Paytm), Net Banking, EMI, and Cash on Delivery up to ₹50,000.' },
    { q: 'Is it safe to enter my card details?', a: 'Yes. All transactions are protected by 256-bit SSL encryption. We are PCI-DSS compliant and never store full card details.' },
    { q: 'Do you offer EMI options?', a: 'Yes, no-cost EMI is available on orders above ₹5,000 with select HDFC, ICICI, SBI, Axis, and Kotak credit cards.' },
  ],
  Returns: [
    { q: 'What is your return policy?', a: 'We offer a 15-day no-questions-asked return policy. Items must be unused, in original packaging, with all accessories and invoice.' },
    { q: 'How long does a refund take?', a: 'Refunds are processed within 2 business days of receiving the return. Credit arrives within 5–7 business days depending on your bank.' },
    { q: 'What if I receive a defective product?', a: "Contact us within 48 hours of delivery with photos/video. We'll arrange immediate replacement or full refund with free pickup." },
  ],
  Account: [
    { q: 'Do I need an account to order?', a: 'You can buy as a guest. But an account lets you track orders, manage wishlist, save addresses, and access exclusive deals.' },
    { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the Sign In page, enter your email, and we\'ll send a reset link within a few minutes.' },
    { q: 'Is my data safe with Moprix?', a: "Yes. We comply with India's DPDP Act and never sell your data. You can request deletion anytime via privacy@moprix.in." },
  ],
};

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden mb-3 transition-all duration-200 cursor-pointer"
      onClick={() => setOpen(v => !v)}
      style={{
        ...glassCard,
        border: open ? '1.5px solid rgba(37,99,235,0.2)' : '1.5px solid rgba(226,232,240,0.6)',
        background: open ? 'rgba(255,255,255,0.95)' : glassCard.background,
      }}
      onMouseEnter={e => {
        if (!open) e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
      }}
      onMouseLeave={e => {
        if (!open) e.currentTarget.style.background = glassCard.background;
      }}>
      <div className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left">
        <span className={`font-semibold text-sm ${open ? 'text-primary' : 'text-secondary-900'}`}>{q}</span>
        <ChevronDown size={18}
          style={{ color: open ? '#2563eb' : '#94a3b8', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          className="flex-shrink-0 transition-transform duration-200" />
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm text-secondary-600 leading-relaxed pt-4"
          style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('Orders');
  const categories = Object.keys(faqData);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)' }}>
        <div className="absolute top-10 right-10 w-16 h-16 rounded-full hidden sm:block opacity-40"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(37,99,235,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.25)' }} />
        <div className="absolute bottom-10 left-16 w-20 h-20 rounded-full hidden sm:block opacity-30"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4), rgba(6,182,212,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.2)' }} />
        <div className="container-custom max-w-2xl relative z-10">
          <span className="text-4xl block mb-4">🙋</span>
          <h1 className="font-display font-black text-5xl text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-300 text-lg">Everything you need to know about shopping at Moprix.</p>
        </div>
      </section>

      <section className="section px-4" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)' }}>
        <div className="container-custom grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div>
            <div className="p-4 rounded-2xl sticky top-24" style={glassCard}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Categories</p>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={activeCategory === cat
                      ? { background: 'linear-gradient(135deg, #2563eb, #06b6d4)', color: '#fff' }
                      : { color: '#64748b' }}
                    onMouseEnter={e => { if (activeCategory !== cat) { e.currentTarget.style.background = 'rgba(248,250,252,0.8)'; e.currentTarget.style.color = '#2563eb'; } }}
                    onMouseLeave={e => { if (activeCategory !== cat) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}>
                    <span>{cat}</span>
                    <span className="text-xs rounded-full px-2 py-0.5"
                      style={activeCategory === cat
                        ? { background: 'rgba(255,255,255,0.2)' }
                        : { background: 'rgba(226,232,240,0.6)', color: '#94a3b8' }}>
                      {faqData[cat].length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-3">
            <h2 className="font-bold text-xl text-secondary-900 mb-6">
              {activeCategory} <span className="text-secondary-400 font-normal text-base">— {faqData[activeCategory].length} questions</span>
            </h2>
            {faqData[activeCategory].map((item, i) => <AccordionItem key={i} {...item} />)}
          </div>
        </div>

        {/* Still need help */}
        <div className="container-custom mt-14">
          <div className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)' }}>
            <div className="absolute top-6 left-12 w-12 h-12 rounded-full hidden sm:block opacity-40"
              style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(37,99,235,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.25)' }} />
            <div className="absolute bottom-6 right-12 w-16 h-16 rounded-full hidden sm:block opacity-30"
              style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4), rgba(6,182,212,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.2)' }} />
            <div className="relative z-10">
              <h3 className="font-display font-black text-3xl text-white mb-3">Still have questions?</h3>
              <p className="text-slate-300 mb-8">Our support team is happy to help anytime.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="mailto:support@moprix.in"
                  className="btn btn-lg text-white gap-2"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}>
                  <Mail size={18} />Email Support
                </a>
                <a href="tel:+919876543210"
                  className="btn btn-lg text-white gap-2"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
                  <Phone size={18} />Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
