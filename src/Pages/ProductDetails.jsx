import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Plus, Minus, Check, Truck, Shield, RotateCcw, Zap } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useProducts } from '../Context/ProductContext';
import ProductCard from '../Components/ProductCard';
import toast from 'react-hot-toast';

const reviews = [
  { name:'Mona K.', city:'Mumbai', rating:5, date:'Dec 2025', text:'Absolutely brilliant! Arrived in 24 hours, 100% genuine, impeccable packaging. Best gadget store in India.', avatar:'AM' },
  { name:'Priya S.', city:'Delhi', rating:5, date:'Nov 2025', text:'Quality is exactly as described. Support team was super helpful. Will definitely order again!', avatar:'PS' },
  { name:'Prasath K.', city:'Bengaluru', rating:4, date:'Oct 2025', text:'Great product. Minor setup confusion resolved by support in minutes. Very satisfied overall.', avatar:'RK' },
  { name:'Varun P.', city:'Pune', rating:5, date:'Sep 2025', text:'Gift for my partner — the unboxing experience alone was worth it. Felt like opening from the brand.', avatar:'SP' },
];

const glassCard = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: '1rem',
};

function Stars({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size}
          style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#e2e8f0' }}
          fill={i <= Math.round(rating) ? '#f59e0b' : 'none'} />
      ))}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const product = products.find(p => p.id === parseInt(id));
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [selectedImg, setSelectedImg] = useState(0);
  const [wished, setWished] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <div className="text-6xl">😕</div>
      <h2 className="font-bold text-2xl text-secondary-900">Product Not Found</h2>
      <Link to="/shop"
        className="btn text-white"
        style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}>
        Back to Shop
      </Link>
    </div>
  );

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const handleAddToCart = () => { for (let i = 0; i < qty; i++) addToCart(product); toast.success('Added to cart!'); };
  const handleBuyNow = () => { for (let i = 0; i < qty; i++) addToCart(product); navigate('/cart'); };

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
          {[['Home','/'],['Shop','/shop'],[product.category,`/shop?category=${product.category}`]].map(([l,t]) => (
            <React.Fragment key={l}>
              <Link to={t} className="hover:text-primary capitalize transition-colors">{l}</Link>
              <ChevronRight size={12} />
            </React.Fragment>
          ))}
          <span className="text-secondary-700 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden aspect-square relative group mb-3 rounded-2xl"
              style={glassCard}>
              <img src={product.images?.[selectedImg] || product.image} alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              {product.badge && (
                <span className={`absolute top-4 left-4 badge badge-${product.badge === 'SALE' ? 'sale' : product.badge === 'NEW' ? 'new' : 'hot'}`}>
                  {product.badge}
                </span>
              )}
              {discount && <span className="absolute top-4 left-4 mt-7 badge badge-sale">-{discount}%</span>}
              <button
                onClick={() => { setWished(v => !v); toast(wished ? 'Removed from wishlist' : '❤️ Saved to wishlist'); }}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{ background: wished ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Heart size={18} style={{ color: wished ? '#ef4444' : '#94a3b8', fill: wished ? '#ef4444' : 'none' }} />
              </button>
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImg(i)}
                    className="w-16 h-16 rounded-xl overflow-hidden transition-all"
                    style={{ border: selectedImg === i ? '2px solid #2563eb' : '2px solid transparent', opacity: selectedImg === i ? 1 : 0.6 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary px-3 py-1 rounded-full mb-3"
                style={{ background: 'rgba(37,99,235,0.08)' }}>
                {product.brand} · {product.category}
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-secondary-900 leading-tight mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Stars rating={product.rating} />
                <span className="font-bold text-secondary-700">{product.rating}</span>
                <span className="text-secondary-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
                <span className={`badge ${product.inStock ? 'badge-new' : 'bg-slate-100 text-slate-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="font-black text-4xl text-secondary-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-secondary-400 line-through font-medium">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="badge badge-sale text-sm">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="text-secondary-600 leading-relaxed text-sm">{product.description}</p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-secondary-700 mb-2">
                  Color: <span className="text-secondary-900">{product.colors[selectedColor]}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c, i) => (
                    <button key={c} onClick={() => setSelectedColor(i)}
                      className="px-3.5 py-2 rounded-xl border-2 text-sm font-medium transition-all"
                      style={{
                        borderColor: selectedColor === i ? '#2563eb' : 'rgba(226,232,240,0.8)',
                        background: selectedColor === i ? 'rgba(37,99,235,0.06)' : 'rgba(248,250,252,0.8)',
                        color: selectedColor === i ? '#2563eb' : '#64748b',
                      }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + CTA */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center rounded-xl overflow-hidden"
                style={{ border: '1.5px solid rgba(226,232,240,0.8)' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-slate-50 text-secondary-700 transition-colors"><Minus size={16} /></button>
                <span className="px-4 font-bold text-secondary-900 min-w-[2.5rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="px-3 py-2.5 hover:bg-slate-50 text-secondary-700 transition-colors"><Plus size={16} /></button>
              </div>
              <button onClick={handleAddToCart} disabled={!product.inStock}
                className="btn flex-1 min-w-[140px] py-3 text-white gap-2"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                <ShoppingCart size={18} />Add to Cart
              </button>
              <button onClick={handleBuyNow} disabled={!product.inStock}
                className="btn btn-outline flex-1 min-w-[120px] py-3 gap-2">
                <Zap size={16} />Buy Now
              </button>
            </div>

            {/* Delivery cards */}
            <div className="grid grid-cols-3 gap-3">
              {[[Truck,'Free Delivery','Orders over ₹10,000'],[Shield,'2 Year Warranty','Manufacturer backed'],[RotateCcw,'15-Day Returns','No questions asked']].map(([Icon, t, d]) => (
                <div key={t} className="p-3 text-center flex flex-col items-center gap-1.5 rounded-xl"
                  style={glassCard}>
                  <Icon size={18} className="text-primary" />
                  <p className="text-xs font-bold text-secondary-900">{t}</p>
                  <p className="text-[10px] text-secondary-400">{d}</p>
                </div>
              ))}
            </div>

            <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!'); }}
              className="btn btn-ghost btn-sm gap-2 self-start text-secondary-500">
              <Share2 size={14} /> Share Product
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16 rounded-2xl overflow-hidden" style={glassCard}>
          <div className="flex overflow-x-auto no-scrollbar" style={{ borderBottom: '1px solid rgba(226,232,240,0.6)' }}>
            {[['description','Description'],['specs','Specifications'],['reviews',`Reviews (${reviews.length})`]].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)}
                className="px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px"
                style={{
                  borderBottomColor: tab === key ? '#2563eb' : 'transparent',
                  color: tab === key ? '#2563eb' : '#94a3b8',
                }}>
                {label}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === 'description' && (
              <div className="space-y-3 text-secondary-600 text-sm leading-relaxed">
                <p>Experience the next level of technology with the <strong className="text-secondary-900">{product.name}</strong>. Carefully engineered for peak performance and premium build quality.</p>
                <p>Whether you're a professional or enthusiast, this device delivers an unmatched experience. Every component is precision-crafted and rigorously quality-tested.</p>
              </div>
            )}
            {tab === 'specs' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {product.specs?.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.5)' }}>
                    <Check size={14} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-secondary-700 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'reviews' && (
              <div>
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                  <div className="text-center">
                    <div className="font-black text-6xl text-primary">{product.rating}</div>
                    <Stars rating={product.rating} size={20} />
                    <p className="text-sm text-secondary-400 mt-1">{product.reviews.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[[5,68],[4,18],[3,8],[2,4],[1,2]].map(([star, pct]) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs font-semibold w-4 text-secondary-600">{star}</span>
                        <Star size={11} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                        <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ background: 'rgba(226,232,240,0.6)' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#f59e0b' }} />
                        </div>
                        <span className="text-xs text-secondary-400 w-7">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {reviews.map(r => (
                    <div key={r.name} className="p-4 rounded-2xl" style={glassCard}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}>
                            {r.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-secondary-900">{r.name}</p>
                            <p className="text-xs text-secondary-400">{r.city} · {r.date}</p>
                          </div>
                        </div>
                        <span className="badge badge-new text-[10px]">Verified</span>
                      </div>
                      <Stars rating={r.rating} size={13} />
                      <p className="text-sm text-secondary-600 mt-2 leading-relaxed italic">"{r.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-secondary-900">More from {product.category}</h2>
              <Link to={`/shop?category=${product.category}`} className="text-sm font-semibold text-primary hover:underline">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
