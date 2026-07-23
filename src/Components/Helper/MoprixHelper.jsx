import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Send, ShoppingCart, ArrowRight, RotateCcw, ChevronDown, Zap } from 'lucide-react';
import { useProducts } from '../../Context/ProductContext';
import { useCart } from '../../Context/CartContext';
import { getRecommendations, extractSummary } from './useHelperEngine';
import toast from 'react-hot-toast';

// ── Styles ────────────────────────────────────────────────────────────────────
const PANEL = {
  position: 'fixed', bottom: '90px', right: '24px',
  width: '420px', maxWidth: 'calc(100vw - 32px)',
  maxHeight: '85vh',
  background: 'rgba(255,255,255,0.97)',
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)',
  border: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 32px 80px rgba(37,99,235,0.18), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)',
  borderRadius: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 9998,
};

const GLASS_CARD = {
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 20px rgba(37,99,235,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: '1rem',
};

// Score bar colour
const scoreColor = (s) => {
  if (s >= 85) return { bar: 'linear-gradient(90deg,#22c55e,#16a34a)', text: '#15803d' };
  if (s >= 70) return { bar: 'linear-gradient(90deg,#2563eb,#06b6d4)', text: '#1d4ed8' };
  if (s >= 55) return { bar: 'linear-gradient(90deg,#f59e0b,#d97706)', text: '#b45309' };
  return { bar: 'linear-gradient(90deg,#94a3b8,#64748b)', text: '#475569' };
};

// ── Suggestion chips ──────────────────────────────────────────────────────────
const SUGGESTIONS = [
  'Laptop for programming and AI under ₹1,20,000',
  'Best wireless earbuds under ₹25,000',
  'Smartphone with great camera under ₹70,000',
  'Gaming laptop under ₹1,50,000',
  'Smartwatch for fitness under ₹40,000',
  'Noise cancelling headphones under ₹30,000',
];

// ── Single result card ────────────────────────────────────────────────────────
function ResultCard({ result, onAddToCart, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const { product, score, reasons } = result;
  const col = scoreColor(score);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div style={{ ...GLASS_CARD, marginBottom: '10px' }} className="overflow-hidden">
      {/* Header row */}
      <div className="flex gap-3 p-3.5 cursor-pointer"
        onClick={() => setExpanded(v => !v)}>

        {/* Rank badge */}
        <div className="relative flex-shrink-0">
          <img src={product.image} alt={product.name}
            className="w-16 h-16 rounded-xl object-cover"
            style={{ border: '1px solid rgba(226,232,240,0.6)' }}
            onError={e => { e.target.src = 'https://via.placeholder.com/64'; }} />
          {index === 0 && (
            <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-white text-[9px] font-black flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
              #1
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <div>
              <p className="font-bold text-sm text-secondary-900 leading-snug line-clamp-2">{product.name}</p>
              <p className="text-xs text-secondary-400 mt-0.5">{product.brand} · {product.category}</p>
            </div>
            <ChevronDown size={15} className="flex-shrink-0 mt-0.5 text-slate-400 transition-transform"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }} />
          </div>

          {/* Score bar */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold" style={{ color: col.text }}>
                {score}% Match
              </span>
              {discount && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(226,232,240,0.6)' }}>
              <div className="h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${score}%`, background: col.bar }} />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-black text-sm text-secondary-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-secondary-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Expandable reasons + actions */}
      {expanded && (
        <div className="px-3.5 pb-3.5 border-t" style={{ borderColor: 'rgba(226,232,240,0.5)' }}>
          {/* Why recommended */}
          <p className="text-[11px] font-bold text-secondary-500 uppercase tracking-wider mt-3 mb-2">
            Why we recommend it
          </p>
          <ul className="space-y-1 mb-3">
            {reasons.slice(0, 6).map((r, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed"
                style={{ color: r.startsWith('✓') ? '#166534' : r.startsWith('⚠') ? '#92400e' : '#991b1b' }}>
                <span className="flex-shrink-0 mt-px text-[11px]">{r[0]}</span>
                <span className="text-secondary-700">{r.slice(2)}</span>
              </li>
            ))}
          </ul>

          {/* Specs preview */}
          {product.specs?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.specs.slice(0, 4).map((s, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-medium text-secondary-600"
                  style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)' }}>
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={() => onAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 18px rgba(37,99,235,0.45)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.3)'}>
              <ShoppingCart size={13} /> Add to Cart
            </button>
            <Link to={`/product/${product.id || product._id}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all"
              style={{ border: '1.5px solid rgba(37,99,235,0.25)', color: '#2563eb' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              View <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MoprixHelper({ onClose }) {
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [query, setQuery]           = useState('');
  const [results, setResults]       = useState([]);
  const [stage, setStage]           = useState('idle'); // idle | thinking | results | none
  const [summary, setSummary]       = useState(null);
  const [history, setHistory]       = useState([]); // [{role, text}]
  const inputRef  = useRef();
  const bottomRef = useRef();

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history, results, stage]);

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    toast.success(`${product.name.slice(0, 24)}… added to cart!`);
  }, [addToCart]);

  const handleSubmit = useCallback(async (text) => {
    const q = (text || query).trim();
    if (!q) return;

    // Add user message
    setHistory(h => [...h, { role: 'user', text: q }]);
    setQuery('');
    setStage('thinking');
    setResults([]);

    // Simulate thinking delay for UX
    await new Promise(r => setTimeout(r, 800));

    const recs   = getRecommendations(q, products, 5);
    const summ   = extractSummary(q);
    setSummary(summ);

    if (recs.length === 0) {
      setHistory(h => [...h, {
        role: 'assistant',
        text: "I couldn't find a strong match for that. Try rephrasing — for example: \"laptop for programming under ₹80,000\" or \"wireless earbuds under ₹25,000\".",
      }]);
      setStage('none');
    } else {
      setHistory(h => [...h, {
        role: 'assistant',
        text: `Found ${recs.length} great match${recs.length > 1 ? 'es' : ''} for you! Here's what I recommend:`,
      }]);
      setResults(recs);
      setStage('results');
    }
  }, [query, products]);

  const handleReset = () => {
    setQuery(''); setResults([]); setStage('idle'); setSummary(null); setHistory([]);
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  return (
    <div style={PANEL} className="animate-fade-in">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg,#1e3a8a,#2563eb,#0891b2)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Sparkles size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-black text-sm text-white leading-none">MoPrix Helper</p>
          <p className="text-[11px] text-blue-200 mt-0.5">AI Gadget Recommendation Assistant</p>
        </div>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button onClick={handleReset}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-blue-200 hover:text-white hover:bg-white/10 transition-all"
              title="Start over">
              <RotateCcw size={15} />
            </button>
          )}
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-blue-200 hover:text-white hover:bg-white/10 transition-all">
            <X size={17} />
          </button>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Welcome / idle state */}
        {stage === 'idle' && history.length === 0 && (
          <div className="animate-fade-in">
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
                style={{ background: 'linear-gradient(135deg,rgba(37,99,235,0.12),rgba(6,182,212,0.12))', border: '1px solid rgba(37,99,235,0.15)' }}>
                <Sparkles size={26} className="text-primary" />
              </div>
              <h3 className="font-display font-black text-lg text-secondary-900">How can I help?</h3>
              <p className="text-xs text-secondary-500 mt-1 leading-relaxed max-w-[280px] mx-auto">
                Tell me your requirements and I'll find the perfect gadget with a personalised explanation.
              </p>
            </div>

            {/* Suggestion chips */}
            <p className="text-[11px] font-bold text-secondary-400 uppercase tracking-wider mb-2">Try asking:</p>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => handleSubmit(s)}
                  className="text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-secondary-700 transition-all"
                  style={{ background: 'rgba(248,250,252,0.9)', border: '1px solid rgba(226,232,240,0.7)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.06)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'; e.currentTarget.style.color = '#2563eb'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,250,252,0.9)'; e.currentTarget.style.borderColor = 'rgba(226,232,240,0.7)'; e.currentTarget.style.color = '#475569'; }}>
                  <Zap size={11} className="inline mr-1.5 text-yellow-500" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat history */}
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5"
                style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', minWidth: 24 }}>
                <Sparkles size={11} className="text-white" />
              </div>
            )}
            <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed`}
              style={msg.role === 'user'
                ? { background: 'linear-gradient(135deg,#2563eb,#06b6d4)', color: '#fff', borderBottomRightRadius: '4px' }
                : { background: 'rgba(248,250,252,0.95)', color: '#1e293b', border: '1px solid rgba(226,232,240,0.6)', borderBottomLeftRadius: '4px' }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Thinking state */}
        {stage === 'thinking' && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-2"
              style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', minWidth: 24 }}>
              <Sparkles size={11} className="text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(248,250,252,0.95)', border: '1px solid rgba(226,232,240,0.6)', borderBottomLeftRadius: '4px' }}>
              <div className="flex items-center gap-2">
                <span className="flex gap-1">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
                <span className="text-xs text-secondary-500">Analysing your requirements…</span>
              </div>
            </div>
          </div>
        )}

        {/* Summary pill */}
        {summary && stage === 'results' && (
          <div className="animate-fade-in flex flex-wrap gap-1.5 px-1">
            {summary.budget && (
              <span className="text-[10px] px-2.5 py-1 rounded-full font-bold text-emerald-700"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                Budget: ₹{summary.budget.toLocaleString()}
              </span>
            )}
            {summary.categories.map(c => (
              <span key={c} className="text-[10px] px-2.5 py-1 rounded-full font-bold text-blue-700"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.18)' }}>
                {c}
              </span>
            ))}
            {summary.usages.slice(0, 3).map(u => (
              <span key={u} className="text-[10px] px-2.5 py-1 rounded-full font-bold text-purple-700"
                style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.18)' }}>
                {u}
              </span>
            ))}
          </div>
        )}

        {/* Results */}
        {stage === 'results' && results.length > 0 && (
          <div className="animate-slide-up">
            {results.map((r, i) => (
              <ResultCard key={r.product.id || r.product._id} result={r} index={i} onAddToCart={handleAddToCart} />
            ))}
            <p className="text-[11px] text-secondary-400 text-center mt-2">
              Not what you're looking for?{' '}
              <button onClick={handleReset} className="text-primary font-bold hover:underline">
                Try a new search
              </button>
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ──────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2"
        style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder="e.g. Laptop for AI and gaming under ₹1,20,000…"
            disabled={stage === 'thinking'}
            className="flex-1 resize-none text-sm text-secondary-900 placeholder-slate-400 focus:outline-none transition-all"
            style={{
              background: 'rgba(248,250,252,0.9)',
              border: '1.5px solid rgba(226,232,240,0.8)',
              borderRadius: '14px',
              padding: '10px 14px',
              maxHeight: '80px',
              lineHeight: 1.5,
            }}
            onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(226,232,240,0.8)'; e.target.style.boxShadow = 'none'; }}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!query.trim() || stage === 'thinking'}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all flex-shrink-0"
            style={{
              background: query.trim() && stage !== 'thinking'
                ? 'linear-gradient(135deg,#2563eb,#06b6d4)'
                : 'rgba(148,163,184,0.4)',
              boxShadow: query.trim() ? '0 4px 12px rgba(37,99,235,0.35)' : 'none',
              cursor: query.trim() && stage !== 'thinking' ? 'pointer' : 'not-allowed',
            }}>
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-secondary-400 text-center mt-2">
          Describe your needs freely — budget, usage, preferences
        </p>
      </div>
    </div>
  );
}
