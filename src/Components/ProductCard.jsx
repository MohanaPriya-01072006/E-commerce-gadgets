import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import toast from 'react-hot-toast';

const glassCard = {
  background: 'rgba(255,255,255,0.82)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.8)',
  boxShadow:
    '0 2px 0 rgba(255,255,255,0.9) inset, 0 8px 32px rgba(37,99,235,0.07), 0 2px 8px rgba(0,0,0,0.04)',
  borderRadius: '1.25rem',
  overflow: 'hidden',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
};

const glassCardHover = {
  transform: 'translateY(-4px)',
  boxShadow:
    '0 2px 0 rgba(255,255,255,0.9) inset, 0 20px 48px rgba(37,99,235,0.13), 0 4px 12px rgba(0,0,0,0.06)',
};

function StarRating({ rating, small }) {
  return (
    <div className={`flex items-center gap-0.5 ${small ? 'text-xs' : 'text-sm'}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={small ? 11 : 13}
          className={
            i <= Math.round(rating)
              ? 'text-warning fill-warning'
              : 'text-secondary-300'
          }
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAdd = e => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name.slice(0, 25)}… added to cart!`);
  };

  const badgeClass = { SALE: 'badge-sale', NEW: 'badge-new', HOT: 'badge-hot' };

  return (
    <div
      style={{ ...glassCard, ...(hovered ? glassCardHover : {}) }}
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden aspect-square"
        style={{
          background:
            'linear-gradient(135deg, rgba(240,246,255,0.9) 0%, rgba(232,240,254,0.9) 100%)',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle glass overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={badgeClass[product.badge]}>{product.badge}</span>
          )}
          {discount && <span className="badge badge-sale">-{discount}%</span>}
          {!product.inStock && (
            <span className="badge bg-white/80 text-secondary-500 border border-secondary-200/60">
              Out of Stock
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={e => {
              e.preventDefault();
              setWished(v => !v);
              toast(wished ? 'Removed from wishlist' : '❤️ Added to wishlist');
            }}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: wished
                ? 'rgba(239,68,68,0.1)'
                : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              color: wished ? '#ef4444' : '#94a3b8',
            }}
          >
            <Heart size={15} className={wished ? 'fill-danger' : ''} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              color: '#94a3b8',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#2563eb')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
          >
            <Eye size={15} />
          </Link>
        </div>
      </Link>

      {/* Content */}
      <div
        className="p-4 flex flex-col gap-2 flex-1"
        style={{
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(255,255,255,0.7)',
        }}
      >
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wide">
            {product.brand}
          </span>
          <span className="text-xs text-secondary-400">{product.category}</span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="font-semibold text-sm text-secondary-900 leading-snug line-clamp-2 hover:text-primary transition-colors"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} small />
          <span className="text-xs text-secondary-500">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="font-black text-lg text-secondary-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-secondary-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`mt-auto btn w-full text-sm gap-2 text-white font-semibold ${
            !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            background: product.inStock
              ? 'linear-gradient(135deg, #2563eb, #06b6d4)'
              : 'rgba(148,163,184,0.4)',
            boxShadow: product.inStock
              ? '0 4px 14px rgba(37,99,235,0.3)'
              : 'none',
            border: 'none',
          }}
        >
          <ShoppingCart size={15} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export { StarRating };
