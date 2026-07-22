import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Tag, Truck, Lock, ShieldCheck } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import toast from 'react-hot-toast';

const COUPONS = { MOPRIX10: 10, SAVE20: 20, FLAT500: 'flat500' };

const glassCard = {
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
};

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(null);
  const [couponErr, setCouponErr] = useState('');

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code] !== undefined) {
      setApplied(code); setCouponErr('');
      toast.success(`Coupon ${code} applied!`);
    } else {
      setCouponErr('Invalid coupon code.'); setApplied(null);
    }
  };

  const discountAmt = applied ? (COUPONS[applied] === 'flat500' ? 500 : Math.round(cartTotal * COUPONS[applied] / 100)) : 0;
  const shipping = cartTotal > 10000 ? 0 : 299;
  const gst = Math.round((cartTotal - discountAmt) * 0.18);
  const total = cartTotal - discountAmt + shipping + gst;

  if (cartItems.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 bg-white">
      <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-4xl"
        style={{ border: '1px solid rgba(226,232,240,0.6)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        🛒
      </div>
      <h2 className="font-display font-black text-2xl text-secondary-900">Your Cart is Empty</h2>
      <p className="text-secondary-500 text-center max-w-xs">You haven't added any products yet. Explore our premium collection!</p>
      <Link to="/shop"
        className="btn btn-lg text-white gap-2"
        style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
        <ShoppingCart size={18} />Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)' }}>
      <div className="container-custom">
        <h1 className="section-title mb-2">Shopping Cart</h1>
        <p className="text-sm text-secondary-500 mb-8">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="p-4 flex gap-4 rounded-2xl"
                style={glassCard}>
                <Link to={`/product/${item.id}`}
                  className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-primary mb-0.5">{item.brand}</p>
                      <Link to={`/product/${item.id}`}
                        className="font-semibold text-sm text-secondary-900 hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => { removeFromCart(item.id); toast.success('Item removed'); }}
                      className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-danger transition-all"
                      style={{ background: 'rgba(248,250,252,0.8)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,250,252,0.8)'; }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                    <div className="flex items-center rounded-xl overflow-hidden"
                      style={{ border: '1.5px solid rgba(226,232,240,0.8)' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 text-secondary-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-bold text-sm text-secondary-900 min-w-[2rem] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 text-secondary-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg text-secondary-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      {item.quantity > 1 && <p className="text-xs text-secondary-400">₹{item.price.toLocaleString()} each</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between flex-wrap gap-2 pt-2">
              <button onClick={() => { clearCart(); toast.success('Cart cleared'); }}
                className="btn btn-ghost btn-sm text-danger gap-2">
                <Trash2 size={14} />Clear Cart
              </button>
              <Link to="/shop" className="btn btn-ghost btn-sm gap-1 text-secondary-600">← Continue Shopping</Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 rounded-2xl sticky top-24" style={glassCard}>
            <h2 className="font-bold text-lg text-secondary-900 mb-5">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-5">
              <label className="label flex items-center gap-2"><Tag size={14} className="text-primary" />Coupon Code</label>
              <div className="flex gap-2">
                <input value={coupon} onChange={e => { setCoupon(e.target.value); setCouponErr(''); }}
                  onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                  placeholder="MOPRIX10" className="input text-sm flex-1" />
                <button onClick={applyCoupon} className="btn btn-outline btn-sm px-4">Apply</button>
              </div>
              {couponErr && <p className="text-xs text-danger mt-1">{couponErr}</p>}
              {applied && <p className="text-xs text-emerald-600 mt-1 font-semibold">✅ {COUPONS[applied] === 'flat500' ? '₹500' : `${COUPONS[applied]}%`} discount applied!</p>}
            </div>

            <div className="space-y-3 mb-4">
              {[
                ['Subtotal', `₹${cartTotal.toLocaleString()}`, ''],
                ...(discountAmt > 0 ? [[`Discount (${applied})`, `-₹${discountAmt.toLocaleString()}`, 'text-emerald-600']] : []),
                ['Shipping', shipping === 0 ? 'FREE 🎉' : `₹${shipping}`, shipping === 0 ? 'text-emerald-600' : ''],
                ['GST (18%)', `₹${gst.toLocaleString()}`, ''],
              ].map(([k, v, cls]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-secondary-500">{k}</span>
                  <span className={`font-semibold text-secondary-900 ${cls}`}>{v}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 mb-5" style={{ borderTop: '1px solid rgba(226,232,240,0.6)' }}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-secondary-900">Total</span>
                <span className="font-black text-2xl text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={() => navigate('/checkout')}
              className="btn w-full btn-lg text-white gap-2 mb-4"
              style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="space-y-2">
              {[[Lock,'Secure SSL Checkout'],[Truck,'Free shipping over ₹10,000'],[ShieldCheck,'100% Genuine Products']].map(([Icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-xs text-secondary-500">
                  <Icon size={13} className="text-emerald-500 flex-shrink-0" />{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
