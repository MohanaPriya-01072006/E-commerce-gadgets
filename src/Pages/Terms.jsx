import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, CreditCard, Truck, AlertCircle, Shield, Scale, ChevronDown, Mail, Phone } from 'lucide-react';

const glassCard = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
};

const sections = [
  {
    id: 1, icon: FileText, color: '#2563eb',
    title: 'Introduction & Acceptance',
    content: [
      { subtitle: 'Agreement', text: 'Welcome to Moprix Gadgets Pvt. Ltd. By accessing moprix.in and placing orders with us, you agree to be legally bound by these Terms & Conditions. If you do not agree, please do not use our services.' },
      { subtitle: 'Changes to Terms', text: 'We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms. The "Last Updated" date will reflect any changes.' },
      { subtitle: 'Eligibility', text: 'You must be at least 18 years of age and legally capable of entering into a binding contract under Indian law to use our services.' },
    ],
  },
  {
    id: 2, icon: ShoppingBag, color: '#2563eb',
    title: 'Products & Orders',
    content: [
      { subtitle: 'Product Accuracy', text: 'We strive to provide accurate descriptions, images, and specifications. However, minor colour variations may occur due to display settings. We do not guarantee error-free product information.' },
      { subtitle: 'Order Acceptance', text: 'Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel orders due to product unavailability, pricing errors, suspected fraud, or exceeding purchase limits.' },
      { subtitle: 'Pricing Policy', text: 'All prices are in Indian Rupees (INR) and include applicable GST unless stated otherwise. Prices may change without prior notice. The price confirmed at checkout is the final price for your order.' },
      { subtitle: 'Availability', text: 'Product availability is subject to stock. If an ordered item becomes unavailable after confirmation, we will notify you and offer a full refund or a suitable alternative.' },
    ],
  },
  {
    id: 3, icon: CreditCard, color: '#22c55e',
    title: 'Payments',
    content: [
      { subtitle: 'Accepted Methods', text: 'We accept Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), UPI (GPay, PhonePe, Paytm), Net Banking, EMI, and Cash on Delivery up to ₹50,000.' },
      { subtitle: 'Security', text: 'All transactions are protected by 256-bit SSL encryption. We are PCI-DSS compliant. We never store complete card details on our servers.' },
      { subtitle: 'EMI Options', text: 'No-cost EMI is available on orders above ₹5,000 with select HDFC, ICICI, SBI, Axis, and Kotak credit cards. EMI terms are subject to issuing bank policies.' },
      { subtitle: 'Failed Payments', text: 'If a payment fails after deduction, the amount will be automatically refunded within 5–7 business days depending on your bank.' },
    ],
  },
  {
    id: 4, icon: Truck, color: '#8b5cf6',
    title: 'Shipping & Delivery',
    content: [
      { subtitle: 'Delivery Timeline', text: 'Metro cities: 1–2 business days. Tier-2 cities: 2–4 business days. Rest of India: 4–7 business days. Timelines are estimates and may be affected by events beyond our control.' },
      { subtitle: 'Shipping Charges', text: 'Free shipping on all orders above ₹10,000. Orders below ₹10,000 are charged a flat ₹99 shipping fee. Express and same-day delivery may attract additional charges.' },
      { subtitle: 'Risk Transfer', text: 'Risk of loss and damage passes to you upon delivery to your shipping address. Please inspect the package at delivery and report damage or tampering within 24 hours.' },
      { subtitle: 'Address Accuracy', text: 'You are responsible for providing accurate delivery information. Moprix is not liable for delays or failed deliveries due to incorrect or incomplete addresses.' },
    ],
  },
  {
    id: 5, icon: AlertCircle, color: '#f59e0b',
    title: 'Returns & Refunds',
    content: [
      { subtitle: 'Return Window', text: 'We offer a 15-day return policy for most products from the date of delivery. Items must be unused, undamaged, in original packaging, with all accessories, manuals, and proof of purchase.' },
      { subtitle: 'Non-Returnable Items', text: 'Opened in-ear earphones or earbuds (for hygiene), software and digital products, customised or engraved items, and products marked "Final Sale" cannot be returned.' },
      { subtitle: 'Return Process', text: 'Initiate a return via your account\'s "My Orders" section or by contacting support@moprix.in. Our team will arrange a free pickup within 2 business days of approval.' },
      { subtitle: 'Refund Timeline', text: 'Refunds are processed within 2 business days after we receive and inspect the returned item. Credit appears within 5–10 business days depending on your bank or payment method.' },
    ],
  },
  {
    id: 6, icon: Shield, color: '#06b6d4',
    title: 'Warranty',
    content: [
      { subtitle: 'Manufacturer Warranty', text: 'All products include the standard manufacturer warranty as specified on the product page — typically 1 to 2 years. Warranty covers manufacturing defects and does not cover physical damage, water damage, or unauthorised modifications.' },
      { subtitle: 'Warranty Claims', text: 'Claims must be made through the manufacturer or their authorised service centres. Moprix will assist in facilitating claims but is not responsible for the manufacturer\'s decisions or timelines.' },
      { subtitle: 'Extended Warranty', text: 'Extended warranty plans are available for select products at additional cost and are governed by their own separate terms and conditions.' },
    ],
  },
  {
    id: 7, icon: Scale, color: '#ec4899',
    title: 'Intellectual Property & Liability',
    content: [
      { subtitle: 'Intellectual Property', text: 'All content on moprix.in — including text, images, logos, UI design, and code — is the property of Moprix Gadgets Pvt. Ltd. or its licensors and is protected by Indian copyright law. Reproduction, redistribution, or commercial use without written consent is prohibited.' },
      { subtitle: 'Limitation of Liability', text: 'Moprix shall not be liable for any indirect, incidental, or consequential damages arising from use of our products or services. Our maximum liability in any case shall not exceed the purchase price of the product in question.' },
      { subtitle: 'Force Majeure', text: 'We are not responsible for delays caused by circumstances beyond our control including natural disasters, government orders, strikes, supply chain disruptions, or pandemic restrictions.' },
    ],
  },
  {
    id: 8, icon: FileText, color: '#64748b',
    title: 'User Conduct & Accounts',
    content: [
      { subtitle: 'Account Responsibility', text: 'You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility. Notify us immediately at security@moprix.in of any unauthorised access.' },
      { subtitle: 'Prohibited Use', text: 'You may not use our platform to engage in fraudulent activity, submit false reviews, scrape data, interfere with our systems, or violate any applicable Indian or international law.' },
      { subtitle: 'Account Termination', text: 'We reserve the right to suspend or terminate accounts that violate these terms, without prior notice, and may pursue legal remedies where warranted.' },
    ],
  },
  {
    id: 9, icon: Scale, color: '#2563eb',
    title: 'Governing Law & Disputes',
    content: [
      { subtitle: 'Governing Law', text: 'These Terms are governed by and construed in accordance with the laws of India, specifically the Information Technology Act 2000, Consumer Protection Act 2019, and other applicable statutes.' },
      { subtitle: 'Dispute Resolution', text: 'We encourage resolving disputes amicably. In the event of unresolved disputes, both parties agree to submit to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka.' },
      { subtitle: 'Consumer Grievances', text: 'In accordance with the Consumer Protection (E-Commerce) Rules 2020, our Grievance Officer can be reached at: grievance@moprix.in or +91 98765 43210 (Mon–Fri, 9 AM–6 PM).' },
    ],
  },
];

function Section({ section }) {
  const [open, setOpen] = useState(true);
  const { icon: Icon, color, title, content, id } = section;
  return (
    <div className="rounded-2xl overflow-hidden mb-4 transition-all duration-300"
      style={glassCard}>
      <button
        className="w-full flex items-center gap-4 p-6 text-left"
        onClick={() => setOpen(v => !v)}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Section {id}</span>
          <h2 className="font-display font-bold text-lg text-secondary-900 leading-tight">{title}</h2>
        </div>
        <ChevronDown size={20} className="text-slate-400 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-4" style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
          {content.map((item, i) => (
            <div key={i} className="pt-4">
              <h3 className="font-semibold text-secondary-900 mb-1.5">{item.subtitle}</h3>
              <p className="text-sm text-secondary-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 px-4 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)' }}>
        <div className="absolute top-8 left-12 w-16 h-16 rounded-full hidden sm:block opacity-40"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(37,99,235,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.25)' }} />
        <div className="absolute bottom-8 right-16 w-20 h-20 rounded-full hidden sm:block opacity-30"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4), rgba(6,182,212,0.1))', boxShadow: 'inset 2px 3px 8px rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.2)' }} />
        <div className="container-custom max-w-3xl relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <FileText className="text-white" size={30} />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">Terms & Conditions</h1>
          <p className="text-slate-300 text-lg mb-3">Please read these terms carefully before using our services.</p>
          <p className="text-sm text-slate-400">Last updated: January 15, 2026 · Effective: January 15, 2026</p>
        </div>
      </section>

      {/* Quick nav */}
      <div className="py-6 px-4 border-b border-slate-100 bg-white sticky top-16 z-30"
        style={{ boxShadow: '0 1px 0 rgba(226,232,240,0.5)' }}>
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {sections.map(s => (
              <a key={s.id} href={`#section-${s.id}`}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-secondary-600 hover:text-primary transition-colors whitespace-nowrap"
                style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}>
                {s.id}. {s.title.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)' }}>
        <div className="container-custom max-w-4xl">

          {/* Acceptance notice */}
          <div className="p-4 rounded-2xl mb-8 flex items-start gap-3"
            style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}>
            <AlertCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-secondary-700 leading-relaxed">
              By accessing Moprix and placing orders, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions and our{' '}
              <Link to="/privacy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          {sections.map(section => (
            <div key={section.id} id={`section-${section.id}`}>
              <Section section={section} />
            </div>
          ))}

          {/* Contact CTA */}
          <div className="mt-8 rounded-3xl p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #0e7490 100%)' }}>
            <h2 className="font-display font-black text-2xl text-white mb-3">Questions about these terms?</h2>
            <p className="text-slate-300 mb-7 max-w-md mx-auto text-sm leading-relaxed">
              Our legal and support team is happy to clarify any part of these terms. Reach out and we'll respond within one business day.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="mailto:legal@moprix.in"
                className="btn btn-lg text-white gap-2"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}>
                <Mail size={18} />legal@moprix.in
              </a>
              <Link to="/contact"
                className="btn btn-lg text-white gap-2"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
                <Phone size={18} />Contact Support
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            © {new Date().getFullYear()} Moprix Gadgets Pvt. Ltd. · CIN: U74999KA2022PTC123456 · Registered in Bangalore, India
          </p>
        </div>
      </div>
    </div>
  );
}
