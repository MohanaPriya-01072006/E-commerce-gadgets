import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      overflow: 'hidden',
      padding: '80px 24px',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Decorative background shapes */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px', position: 'relative', zIndex: 1 }}>
        
        {/* Text Content */}
        <div style={{ flex: '1 1 500px' }} className="animate-slide-left">
          <div style={{ display: 'inline-block', padding: '6px 12px', background: '#dbeafe', color: '#2563eb', borderRadius: '99px', fontSize: '13px', fontWeight: 700, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Next Generation Gadgets
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '24px' }}>
            The Future of Tech is <span style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Already Here.</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, marginBottom: '40px', maxWidth: '540px' }}>
            Discover our premium collection of smartphones, laptops, and wearables designed to elevate your everyday experience with cutting-edge innovation.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
              Shop Now
            </Link>
            <Link to="/about" className="btn-outline" style={{ padding: '16px 32px', fontSize: '16px' }}>
              Learn More
            </Link>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>50k+</span>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Happy Customers</span>
            </div>
            <div style={{ width: '1px', height: '40px', background: '#cbd5e1' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>4.9/5</span>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Average Rating</span>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }} className="animate-fade-in-up">
          <div className="glass" style={{ borderRadius: '24px', padding: '24px', position: 'relative', zIndex: 2, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
            <img 
              src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&auto=format&fit=crop" 
              alt="Premium Gadgets" 
              style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', display: 'block' }} 
            />
            
            {/* Floating badges */}
            <div className="glass animate-float" style={{ position: 'absolute', top: '-20px', right: '-20px', padding: '12px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '40px', height: '40px', background: '#dbeafe', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🌟</div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Top Rated</div>
                <div style={{ fontSize: '15px', color: '#0f172a', fontWeight: 800 }}>Moprix X1 Pro</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
