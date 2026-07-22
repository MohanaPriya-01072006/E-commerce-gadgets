import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Products',        to: '/shop' },
    { label: 'Laptops',             to: '/shop?category=laptops' },
    { label: 'Smartphones',         to: '/shop?category=smartphones' },
    { label: 'Earbuds & Headphones',to: '/shop?category=earbuds' },
    { label: 'Flash Deals',         to: '/shop?badge=SALE' },
  ],
  Company: [
    { label: 'About Us',   to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Careers',    to: '/application' },
    { label: 'FAQ',        to: '/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy',    to: '/privacy' },
    { label: 'Terms & Conditions',to: '/terms' },
    { label: 'Enquiry Form',      to: '/enquiry' },
  ],
};

const socials = [
  { label: 'X',         href: '#', emoji: '𝕏' },
  { label: 'Instagram', href: '#', emoji: '📷' },
  { label: 'YouTube',   href: '#', emoji: '▶' },
  { label: 'LinkedIn',  href: '#', emoji: '💼' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f2040 100%)' }}>
      <div className="container-custom px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
                M
              </div>
              <div>
                <span className="font-display font-black text-lg text-white">Moprix</span>
                <span className="block text-[9px] text-slate-500 uppercase tracking-widest">Gadgets & Tech</span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-xs">
              India's most trusted destination for premium tech. Genuine products, lightning-fast delivery.
            </p>

            {/* Socials */}
            <div className="flex gap-2 mb-4">
              {socials.map(({ label, href, emoji }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white transition-all text-sm"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}>
                  {emoji}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2"><MapPin size={12} className="text-blue-400 flex-shrink-0" /> MG Road, Bangalore 560001</div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-blue-400 flex-shrink-0" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><Mail  size={12} className="text-blue-400 flex-shrink-0" /> support@moprix.in</div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-bold text-xs text-white mb-3 uppercase tracking-wider">{heading}</h4>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-xs text-slate-400 hover:text-blue-300 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex gap-2 flex-wrap">
            {['Visa','Mastercard','UPI','GPay','RazorPay'].map(p => (
              <span key={p} className="px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-400"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>{p}</span>
            ))}
          </div>
          <p className="text-[10px] text-slate-600">© {new Date().getFullYear()} Moprix Gadgets Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
