import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home, Truck, Package } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || `MX-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 shadow-float animate-bounce-in" style={{animation:'bounce-in 0.6s ease forwards'}}>
          <CheckCircle size={48} className="text-success" />
        </div>
        <h1 className="font-display font-black text-4xl text-secondary-900 dark:text-white mb-3">Order Confirmed!</h1>
        <p className="text-secondary-500 mb-8 leading-relaxed max-w-sm mx-auto">Thank you for shopping with Moprix! Your premium gadgets are being prepared for express dispatch.</p>

        <div className="card p-5 mb-6 text-center">
          <p className="text-sm text-secondary-500 mb-1">Your Order ID</p>
          <p className="font-black text-lg text-primary tracking-wider" style={{ wordBreak: 'break-all' }}>{orderId}</p>
          <p className="text-xs text-secondary-400 mt-1">Save this for tracking.</p>
        </div>

        <div className="card p-5 mb-8 text-left">
          <p className="font-bold text-secondary-900 dark:text-white mb-4">What happens next?</p>
          <div className="space-y-4">
            {[
              { icon: CheckCircle, title: 'Order Confirmed', desc: 'Payment received & order placed.', done: true, color: 'text-success bg-green-100 dark:bg-green-900/30' },
              { icon: Package, title: 'Processing & Packing', desc: 'Your items are being carefully packed.', done: false, color: 'text-primary bg-primary-100 dark:bg-primary-900/30' },
              { icon: Truck, title: 'Out for Delivery', desc: 'Tracking link sent via SMS & email.', done: false, color: 'text-secondary-400 bg-secondary-100 dark:bg-secondary-800' },
            ].map((s, i, arr) => (
              <div key={s.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${s.color}`}><s.icon size={16} /></div>
                  {i < arr.length - 1 && <div className="flex-1 w-px bg-secondary-200 dark:bg-secondary-700 my-1" />}
                </div>
                <div className="pb-4">
                  <p className={`font-semibold text-sm ${s.done ? 'text-success' : 'text-secondary-900 dark:text-white'}`}>{s.title}</p>
                  <p className="text-xs text-secondary-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <Link to="/shop" className="btn btn-primary btn-lg gap-2 justify-center"><ShoppingBag size={18} />Continue Shopping</Link>
          <Link to="/" className="btn btn-outline btn-lg gap-2 justify-center"><Home size={18} />Back to Home</Link>
        </div>

        <p className="text-sm text-secondary-400 mt-6">Questions? Email <a href="mailto:support@moprix.in" className="text-primary font-semibold hover:underline">support@moprix.in</a> or call <strong>+91 98765 43210</strong></p>
      </div>
    </div>
  );
}
