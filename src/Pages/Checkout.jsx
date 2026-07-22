import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Lock, CreditCard, Truck, ClipboardList } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const STEPS = [
  { id: 0, label: 'Shipping', icon: Truck },
  { id: 1, label: 'Payment', icon: CreditCard },
  { id: 2, label: 'Review', icon: ClipboardList },
];

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input {...props} className={`input ${error ? 'input-error' : ''}`} />
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
}

function validateShipping(d) {
  const e = {};
  if (!d.firstName?.trim()) e.firstName = 'Required';
  if (!d.lastName?.trim()) e.lastName = 'Required';
  if (!d.email?.trim()) e.email = 'Required';
  else if (!/\S+@\S+\.\S+/.test(d.email)) e.email = 'Invalid email';
  if (!d.phone?.trim()) e.phone = 'Required';
  if (!d.address?.trim()) e.address = 'Required';
  if (!d.city?.trim()) e.city = 'Required';
  if (!d.state?.trim()) e.state = 'Required';
  if (!d.pincode?.trim()) e.pincode = 'Required';
  return e;
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({});
  const [payment, setPayment] = useState({ method: 'card' });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const tax = Math.round(cartTotal * 0.18);
  const shipFee = cartTotal > 10000 ? 0 : 299;
  const total = cartTotal + tax + shipFee;

  if (!cartItems.length) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h2 className="font-bold text-2xl text-secondary-900 dark:text-white">Your cart is empty</h2>
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

  const handlePlace = () => {
    setPlacing(true);
    setTimeout(() => { clearCart(); navigate('/order-success'); }, 2000);
  };

  const sf = (k, v) => setShipping(p => ({ ...p, [k]: v }));
  const pf = (k, v) => setPayment(p => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-8 px-4">
      <div className="container-custom max-w-5xl">
        <h1 className="section-title text-center mb-2">Secure Checkout</h1>
        <p className="text-center text-secondary-500 text-sm mb-10 flex items-center justify-center gap-1.5"><Lock size={14} className="text-success" />SSL Encrypted · Safe & Secure</p>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step > i ? 'bg-success text-white' : step === i ? 'bg-primary text-white shadow-float' : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-400'}`}>
                  {step > i ? <Check size={16} /> : <s.icon size={16} />}
                </div>
                <span className={`text-xs font-semibold ${step >= i ? 'text-primary' : 'text-secondary-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 mb-6 transition-all ${step > i ? 'bg-success' : 'bg-secondary-200 dark:bg-secondary-700'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 sm:p-8">
              {/* Step 0: Shipping */}
              {step === 0 && (
                <div>
                  <h2 className="font-bold text-xl text-secondary-900 dark:text-white mb-6 flex items-center gap-2"><Truck size={20} className="text-primary" />Shipping Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" value={shipping.firstName || ''} onChange={e => sf('firstName', e.target.value)} error={errors.firstName} placeholder="Rahul" />
                    <Field label="Last Name" value={shipping.lastName || ''} onChange={e => sf('lastName', e.target.value)} error={errors.lastName} placeholder="Sharma" />
                    <div className="col-span-2"><Field label="Email Address" type="email" value={shipping.email || ''} onChange={e => sf('email', e.target.value)} error={errors.email} placeholder="rahul@email.com" /></div>
                    <div className="col-span-2"><Field label="Phone Number" type="tel" value={shipping.phone || ''} onChange={e => sf('phone', e.target.value)} error={errors.phone} placeholder="+91 98765 43210" /></div>
                    <div className="col-span-2"><Field label="Street Address" value={shipping.address || ''} onChange={e => sf('address', e.target.value)} error={errors.address} placeholder="123, MG Road" /></div>
                    <Field label="City" value={shipping.city || ''} onChange={e => sf('city', e.target.value)} error={errors.city} placeholder="Bangalore" />
                    <Field label="State" value={shipping.state || ''} onChange={e => sf('state', e.target.value)} error={errors.state} placeholder="Karnataka" />
                    <Field label="PIN Code" value={shipping.pincode || ''} onChange={e => sf('pincode', e.target.value)} error={errors.pincode} placeholder="560001" />
                    <Field label="Landmark (Optional)" value={shipping.landmark || ''} onChange={e => sf('landmark', e.target.value)} placeholder="Near Metro Station" />
                  </div>
                  <div className="mt-5 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center gap-3">
                    <Truck size={18} className="text-primary flex-shrink-0" />
                    <p className="text-sm text-primary-700 dark:text-primary-300 font-medium">Free express delivery on orders over ₹10,000. Standard: ₹299.</p>
                  </div>
                </div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <div>
                  <h2 className="font-bold text-xl text-secondary-900 dark:text-white mb-6 flex items-center gap-2"><CreditCard size={20} className="text-primary" />Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {[['card','💳 Credit / Debit Card'],['upi','📱 UPI (GPay, PhonePe, Paytm)'],['netbanking','🏦 Net Banking'],['cod','🏠 Cash on Delivery']].map(([val, label]) => (
                      <label key={val} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${payment.method === val ? 'border-primary bg-primary-50 dark:bg-primary-900/20' : 'border-secondary-200 dark:border-secondary-700 hover:border-primary/50'}`}>
                        <input type="radio" name="paymentMethod" value={val} checked={payment.method === val} onChange={e => pf('method', e.target.value)} className="accent-primary" />
                        <span className="font-medium text-secondary-800 dark:text-secondary-200">{label}</span>
                      </label>
                    ))}
                  </div>
                  {payment.method === 'card' && (
                    <div className="grid gap-4 bg-secondary-50 dark:bg-secondary-800 rounded-2xl p-5">
                      <Field label="Card Number" value={payment.cardNum || ''} onChange={e => pf('cardNum', e.target.value)} placeholder="1234 5678 9012 3456" />
                      <Field label="Cardholder Name" value={payment.cardName || ''} onChange={e => pf('cardName', e.target.value)} placeholder="RAHUL SHARMA" />
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry (MM/YY)" value={payment.expiry || ''} onChange={e => pf('expiry', e.target.value)} placeholder="08/28" />
                        <Field label="CVV" type="password" value={payment.cvv || ''} onChange={e => pf('cvv', e.target.value)} placeholder="•••" />
                      </div>
                    </div>
                  )}
                  {payment.method === 'upi' && (
                    <div className="bg-secondary-50 dark:bg-secondary-800 rounded-2xl p-5">
                      <Field label="UPI ID" value={payment.upiId || ''} onChange={e => pf('upiId', e.target.value)} placeholder="yourname@upi" />
                    </div>
                  )}
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                    <Lock size={14} /><span className="font-medium">256-bit SSL encrypted. Your payment is 100% secure.</span>
                  </div>
                </div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <div>
                  <h2 className="font-bold text-xl text-secondary-900 dark:text-white mb-6 flex items-center gap-2"><ClipboardList size={20} className="text-primary" />Review Your Order</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="card p-4">
                      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Shipping Address</p>
                      <p className="text-sm text-secondary-700 dark:text-secondary-300 leading-relaxed">{shipping.firstName} {shipping.lastName}<br />{shipping.address}, {shipping.city}<br />{shipping.state} — {shipping.pincode}<br />{shipping.phone}</p>
                    </div>
                    <div className="card p-4">
                      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Payment Method</p>
                      <p className="text-sm text-secondary-700 dark:text-secondary-300 capitalize">{payment.method === 'card' ? `Card ending ···· ${payment.cardNum?.slice(-4) || '****'}` : payment.method === 'upi' ? `UPI: ${payment.upiId || 'N/A'}` : payment.method === 'netbanking' ? 'Net Banking' : 'Cash on Delivery'}</p>
                    </div>
                  </div>
                  <div className="card overflow-hidden">
                    <div className="bg-secondary-50 dark:bg-secondary-800 px-4 py-3 border-b border-secondary-100 dark:border-secondary-700">
                      <p className="text-sm font-bold text-secondary-900 dark:text-white">Order Items ({cartItems.length})</p>
                    </div>
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-secondary-100 dark:border-secondary-700 last:border-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-secondary-100"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                        <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-secondary-900 dark:text-white line-clamp-1">{item.name}</p><p className="text-xs text-secondary-400">×{item.quantity}</p></div>
                        <p className="font-bold text-sm text-secondary-900 dark:text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 gap-3">
                <button disabled={step === 0} onClick={() => setStep(s => s - 1)} className="btn btn-ghost disabled:opacity-40">← Back</button>
                {step < 2 ? (
                  <button onClick={handleNext} className="btn btn-primary gap-2 px-8">Continue <ChevronRight size={16} /></button>
                ) : (
                  <button onClick={handlePlace} disabled={placing} className="btn btn-primary btn-lg gap-2 px-8">
                    <Lock size={16} />{placing ? 'Placing Order…' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="card p-5 sticky top-24">
            <p className="font-bold text-secondary-900 dark:text-white mb-4">Order Summary</p>
            <div className="space-y-2.5 mb-4 max-h-64 overflow-y-auto no-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-secondary-100"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-secondary-900 dark:text-white line-clamp-1">{item.name}</p><p className="text-xs text-secondary-400">×{item.quantity}</p></div>
                  <p className="text-xs font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-secondary-100 dark:border-secondary-700 pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-secondary-500">Subtotal</span><span className="font-semibold">₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-secondary-500">Shipping</span><span className={`font-semibold ${shipFee === 0 ? 'text-success' : ''}`}>{shipFee === 0 ? 'FREE' : `₹${shipFee}`}</span></div>
              <div className="flex justify-between"><span className="text-secondary-500">GST (18%)</span><span className="font-semibold">₹{tax.toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-secondary-100 dark:border-secondary-700 pt-2 mt-1">
                <span className="font-bold text-secondary-900 dark:text-white">Total</span>
                <span className="font-black text-lg text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
