import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Lock, CreditCard, Truck, ClipboardList } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import api from '../Services/api';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 0, label: 'Shipping', icon: Truck },
  { id: 1, label: 'Payment', icon: CreditCard },
  { id: 2, label: 'Review',  icon: ClipboardList },
];

const glass = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 4px 24px rgba(37,99,235,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: '1.25rem',
};

const innerBox = {
  background: 'rgba(248,250,252,0.8)',
  border: '1px solid rgba(226,232,240,0.6)',
  borderRadius: '0.875rem',
};

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="label" style={{ color: '#374151' }}>{label}</label>
      <input {...props} className={`input ${error ? 'input-error' : ''}`}
        style={{ color: '#111827', background: 'rgba(255,255,255,0.9)' }} />
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
}

function validateShipping(d) {
  const e = {};
  if (!d.firstName?.trim()) e.firstName = 'Required';
  if (!d.lastName?.trim())  e.lastName  = 'Required';
  if (!d.email?.trim())     e.email     = 'Required';
  else if (!/\S+@\S+\.\S+/.test(d.email)) e.email = 'Invalid email';
  if (!d.phone?.trim())     e.phone    = 'Required';
  if (!d.address?.trim())   e.address  = 'Required';
  if (!d.city?.trim())      e.city     = 'Required';
  if (!d.state?.trim())     e.state    = 'Required';
  if (!d.pincode?.trim())   e.pincode  = 'Required';
  return e;
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep]       = useState(0);
  const [shipping, setShipping] = useState({});
  const [payment, setPayment]   = useState({ method: 'card' });
  const [errors, setErrors]     = useState({});
  const [placing, setPlacing]   = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to complete your checkout');
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate]);

  const tax     = Math.round(cartTotal * 0.18);
  const shipFee = cartTotal > 10000 ? 0 : 299;
  const total   = cartTotal + tax + shipFee;

  if (!cartItems.length) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h2 className="font-bold text-2xl text-secondary-900">Your cart is empty</h2>
      <Link to="/shop" className="btn btn-primary">Go Shopping</Link>
    </div>
  );

  const handleNext = () => {
    if (step === 0) {
      const e = validateShipping(shipping);
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
    }
    setStep(s => s + 1);
  };

  const handlePlace = async () => {
    setPlacing(true);
    try {
      const orderItems = cartItems.map(item => {
        const pid = String(item._id || item.id || '');
        const sanitised = {
          name:     item.name,
          quantity: item.quantity,
          image:    item.image,
          price:    item.price,
        };
        // Only attach product ref if it's a valid 24-char MongoDB ObjectId
        if (/^[a-f\d]{24}$/i.test(pid)) sanitised.product = pid;
        return sanitised;
      });

      const { data } = await api.post('/orders', {
        orderItems,
        shippingAddress: {
          fullName:   `${shipping.firstName} ${shipping.lastName}`,
          address:    shipping.address,
          city:       shipping.city,
          postalCode: shipping.pincode,
          country:    'India',
        },
        paymentMethod: payment.method,
        itemsPrice:    cartTotal,
        taxPrice:      tax,
        shippingPrice: shipFee,
        totalPrice:    total,
      });

      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-success?orderId=${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const sf = (k, v) => setShipping(p => ({ ...p, [k]: v }));
  const pf = (k, v) => setPayment(p => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'transparent' }}>
      <div className="container-custom max-w-5xl">

        {/* Title */}
        <h1 className="section-title text-center mb-2" style={{ color: '#0f172a' }}>Secure Checkout</h1>
        <p className="text-center text-secondary-500 text-sm mb-10 flex items-center justify-center gap-1.5">
          <Lock size={14} className="text-emerald-500" /> SSL Encrypted · Safe & Secure
        </p>

        {/* ── Stepper ── */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                  style={
                    step > i
                      ? { background: '#22c55e', color: '#fff' }
                      : step === i
                      ? { background: 'linear-gradient(135deg,#2563eb,#06b6d4)', color: '#fff', boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }
                      : { background: 'rgba(226,232,240,0.8)', color: '#94a3b8' }
                  }>
                  {step > i ? <Check size={16} /> : <s.icon size={16} />}
                </div>
                <span className="text-xs font-semibold"
                  style={{ color: step >= i ? '#2563eb' : '#94a3b8' }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 mb-6 transition-all"
                  style={{ background: step > i ? '#22c55e' : 'rgba(226,232,240,0.8)' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* ── Form card ── */}
          <div className="lg:col-span-2">
            <div style={glass} className="p-6 sm:p-8">

              {/* Step 0 — Shipping */}
              {step === 0 && (
                <div>
                  <h2 className="font-bold text-xl mb-6 flex items-center gap-2" style={{ color: '#0f172a' }}>
                    <Truck size={20} className="text-primary" /> Shipping Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" value={shipping.firstName || ''} onChange={e => sf('firstName', e.target.value)} error={errors.firstName} placeholder="Rahul" />
                    <Field label="Last Name"  value={shipping.lastName  || ''} onChange={e => sf('lastName',  e.target.value)} error={errors.lastName}  placeholder="Sharma" />
                    <div className="col-span-2"><Field label="Email Address" type="email" value={shipping.email   || ''} onChange={e => sf('email',   e.target.value)} error={errors.email}   placeholder="rahul@email.com" /></div>
                    <div className="col-span-2"><Field label="Phone Number"  type="tel"   value={shipping.phone   || ''} onChange={e => sf('phone',   e.target.value)} error={errors.phone}   placeholder="+91 98765 43210" /></div>
                    <div className="col-span-2"><Field label="Street Address"              value={shipping.address || ''} onChange={e => sf('address', e.target.value)} error={errors.address} placeholder="123, MG Road" /></div>
                    <Field label="City"     value={shipping.city    || ''} onChange={e => sf('city',    e.target.value)} error={errors.city}    placeholder="Bangalore" />
                    <Field label="State"    value={shipping.state   || ''} onChange={e => sf('state',   e.target.value)} error={errors.state}   placeholder="Karnataka" />
                    <Field label="PIN Code" value={shipping.pincode || ''} onChange={e => sf('pincode', e.target.value)} error={errors.pincode} placeholder="560001" />
                    <Field label="Landmark (Optional)" value={shipping.landmark || ''} onChange={e => sf('landmark', e.target.value)} placeholder="Near Metro Station" />
                  </div>
                  <div className="mt-5 p-4 rounded-xl flex items-center gap-3"
                    style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}>
                    <Truck size={18} className="text-primary flex-shrink-0" />
                    <p className="text-sm font-medium" style={{ color: '#1d4ed8' }}>
                      Free express delivery on orders over ₹10,000. Standard: ₹299.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 1 — Payment */}
              {step === 1 && (
                <div>
                  <h2 className="font-bold text-xl mb-6 flex items-center gap-2" style={{ color: '#0f172a' }}>
                    <CreditCard size={20} className="text-primary" /> Payment Method
                  </h2>
                  <div className="space-y-3 mb-6">
                    {[
                      ['card',       '💳 Credit / Debit Card'],
                      ['upi',        '📱 UPI (GPay, PhonePe, Paytm)'],
                      ['netbanking', '🏦 Net Banking'],
                      ['cod',        '🏠 Cash on Delivery'],
                    ].map(([val, label]) => (
                      <label key={val}
                        className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all"
                        style={payment.method === val
                          ? { border: '2px solid #2563eb', background: 'rgba(37,99,235,0.06)' }
                          : { border: '1.5px solid rgba(226,232,240,0.8)', background: 'rgba(255,255,255,0.7)' }}>
                        <input type="radio" name="paymentMethod" value={val}
                          checked={payment.method === val}
                          onChange={e => pf('method', e.target.value)}
                          className="accent-primary" />
                        <span className="font-medium" style={{ color: '#1e293b' }}>{label}</span>
                      </label>
                    ))}
                  </div>

                  {payment.method === 'card' && (
                    <div className="grid gap-4 p-5 rounded-2xl" style={innerBox}>
                      <Field label="Card Number"      value={payment.cardNum  || ''} onChange={e => pf('cardNum',  e.target.value)} placeholder="1234 5678 9012 3456" />
                      <Field label="Cardholder Name"  value={payment.cardName || ''} onChange={e => pf('cardName', e.target.value)} placeholder="RAHUL SHARMA" />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry (MM/YY)" value={payment.expiry || ''} onChange={e => pf('expiry', e.target.value)} placeholder="08/28" />
                        <Field label="CVV" type="password" value={payment.cvv || ''} onChange={e => pf('cvv', e.target.value)} placeholder="•••" />
                      </div>
                    </div>
                  )}
                  {payment.method === 'upi' && (
                    <div className="p-5 rounded-2xl" style={innerBox}>
                      <Field label="UPI ID" value={payment.upiId || ''} onChange={e => pf('upiId', e.target.value)} placeholder="yourname@upi" />
                    </div>
                  )}

                  <div className="mt-4 p-3 rounded-xl flex items-center gap-2 text-sm"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#166534' }}>
                    <Lock size={14} />
                    <span className="font-medium">256-bit SSL encrypted. Your payment is 100% secure.</span>
                  </div>
                </div>
              )}

              {/* Step 2 — Review */}
              {step === 2 && (
                <div>
                  <h2 className="font-bold text-xl mb-6 flex items-center gap-2" style={{ color: '#0f172a' }}>
                    <ClipboardList size={20} className="text-primary" /> Review Your Order
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-2xl" style={innerBox}>
                      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Shipping Address</p>
                      <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                        {shipping.firstName} {shipping.lastName}<br />
                        {shipping.address}, {shipping.city}<br />
                        {shipping.state} — {shipping.pincode}<br />
                        {shipping.phone}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl" style={innerBox}>
                      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Payment Method</p>
                      <p className="text-sm capitalize" style={{ color: '#374151' }}>
                        {payment.method === 'card'       ? `Card ending ···· ${payment.cardNum?.slice(-4) || '****'}`
                        : payment.method === 'upi'       ? `UPI: ${payment.upiId || 'N/A'}`
                        : payment.method === 'netbanking' ? 'Net Banking'
                        : 'Cash on Delivery'}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden" style={innerBox}>
                    <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(226,232,240,0.6)' }}>
                      <p className="text-sm font-bold" style={{ color: '#0f172a' }}>Order Items ({cartItems.length})</p>
                    </div>
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3 px-4 py-3"
                        style={{ borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
                          style={{ background: 'rgba(248,250,252,0.9)' }}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold line-clamp-1" style={{ color: '#0f172a' }}>{item.name}</p>
                          <p className="text-xs" style={{ color: '#94a3b8' }}>×{item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm" style={{ color: '#0f172a' }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 gap-3">
                <button disabled={step === 0} onClick={() => setStep(s => s - 1)}
                  className="btn btn-ghost disabled:opacity-40"
                  style={{ color: '#475569' }}>
                  ← Back
                </button>
                {step < 2 ? (
                  <button onClick={handleNext}
                    className="btn gap-2 px-8 text-white font-semibold"
                    style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                    Continue <ChevronRight size={16} />
                  </button>
                ) : (
                  <button onClick={handlePlace} disabled={placing}
                    className="btn btn-lg gap-2 px-8 text-white font-semibold"
                    style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                    <Lock size={16} />
                    {placing
                      ? <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Placing Order…
                        </span>
                      : 'Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Order Summary sidebar ── */}
          <div className="sticky top-24" style={glass}>
            <div className="p-5">
              <p className="font-bold mb-4" style={{ color: '#0f172a' }}>Order Summary</p>

              <div className="space-y-2.5 mb-4 max-h-64 overflow-y-auto no-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ background: 'rgba(248,250,252,0.9)' }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-1" style={{ color: '#0f172a' }}>{item.name}</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold" style={{ color: '#0f172a' }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 space-y-2 text-sm" style={{ borderTop: '1px solid rgba(226,232,240,0.6)' }}>
                <div className="flex justify-between">
                  <span style={{ color: '#64748b' }}>Subtotal</span>
                  <span className="font-semibold" style={{ color: '#0f172a' }}>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#64748b' }}>Shipping</span>
                  <span className="font-semibold" style={{ color: shipFee === 0 ? '#22c55e' : '#0f172a' }}>
                    {shipFee === 0 ? 'FREE' : `₹${shipFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#64748b' }}>GST (18%)</span>
                  <span className="font-semibold" style={{ color: '#0f172a' }}>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 mt-1"
                  style={{ borderTop: '1px solid rgba(226,232,240,0.6)' }}>
                  <span className="font-bold" style={{ color: '#0f172a' }}>Total</span>
                  <span className="font-black text-lg text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
