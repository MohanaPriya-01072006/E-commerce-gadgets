import React from 'react';
import HeroSection from '../Components/HeroSection';
import ProductCard from '../Components/ProductCard';
import { products } from '../Data/products';
import { Link } from 'react-router-dom';

export default function Home() {
  const trendingProducts = products.filter(p => p.isTrending);

  const categories = [
    { name: "Smartphones", icon: "📱", color: "#dbeafe", text: "#2563eb" },
    { name: "Laptops", icon: "💻", color: "#f3e8ff", text: "#7c3aed" },
    { name: "Wearables", icon: "⌚", color: "#fce7f3", text: "#db2777" },
    { name: "Accessories", icon: "🎧", color: "#ffedd5", text: "#ea580c" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '80px' }}>
      <HeroSection />

      {/* Shop by Category */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-sub">Find exactly what you're looking for</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/shop?category=${cat.name}`} 
              style={{ textDecoration: 'none' }}
            >
              <div className="product-card" style={{ 
                background: '#fff', borderRadius: '16px', padding: '32px 24px', 
                border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '20px' 
              }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '16px', 
                  background: cat.color, color: cat.text, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' 
                }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{cat.name}</h3>
                  <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Explore collection &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                Hot Right Now
              </span>
            </div>
            <h2 className="section-title">Trending Gadgets</h2>
          </div>
          <Link to="/shop" className="btn-outline" style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline-flex' } }}>
            View All Products
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px', display: 'block', '@media (min-width: 768px)': { display: 'none' } }}>
           <Link to="/shop" className="btn-outline">
            View All Products
          </Link>
        </div>
      </section>
      
      {/* Features Banner */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
          borderRadius: '24px', padding: '64px 32px', color: '#fff',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Background decoration */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(255,255,255,0) 70%)', transform: 'translate(30%, -30%)' }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>⚡</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Lightning Fast Delivery</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Get your premium gadgets delivered to your doorstep within 24 hours in metro cities.</p>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>🛡️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>2 Year Warranty</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Peace of mind guaranteed. All our products come with a comprehensive 2-year warranty.</p>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>💎</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Premium Quality</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Every product in our catalog goes through rigorous quality checks before reaching you.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
