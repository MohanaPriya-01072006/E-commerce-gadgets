import React, { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Search, X, Check, Package, Star, ToggleLeft, ToggleRight, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useProducts } from '../../Context/ProductContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['laptops','smartphones','tablets','smartwatches','earbuds','headphones','speakers','gaming','keyboards-mice','smart-home'];
const BRANDS     = ['Apple','Samsung','Sony','Dell','HP','Lenovo','Bose','JBL','Razer','Logitech','OnePlus','Xiaomi','Google','ASUS','Amazon','Marshall'];
const BADGES     = ['', 'NEW', 'HOT', 'SALE'];

const card = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: '1rem',
};

const EMPTY = {
  name: '', brand: BRANDS[0], category: CATEGORIES[0], price: '', originalPrice: '',
  description: '', image: '', specs: '', colors: '', badge: '', inStock: true,
  rating: '4.5', reviews: '0',
};

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-2xl rounded-3xl p-7 relative"
        style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(32px)', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.8)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-secondary-900">{title}</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-secondary-400 hover:text-secondary-700 hover:bg-slate-100 transition-all">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function AdminProducts() {
  const { products, apiAvailable, addProduct, updateProduct, deleteProduct, refreshProducts } = useProducts();
  const [search, setSearch]     = useState('');
  const [catFilter, setCat]     = useState('');
  const [modal, setModal]       = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [saving, setSaving]     = useState(false);

  const list = useMemo(() => {
    let p = products;
    if (search) p = p.filter(x => x.name.toLowerCase().includes(search.toLowerCase()) || x.brand.toLowerCase().includes(search.toLowerCase()));
    if (catFilter) p = p.filter(x => x.category === catFilter);
    return p;
  }, [products, search, catFilter]);

  const set     = k => e => { setForm(p => ({ ...p, [k]: e.target.value })); if (errors[k]) setErrors(p => ({ ...p, [k]: '' })); };
  const setBool = k => () => setForm(p => ({ ...p, [k]: !p[k] }));

  const openAdd  = () => { setForm(EMPTY); setErrors({}); setModal('add'); };
  const openEdit = (p) => {
    setSelected(p);
    setForm({
      name: p.name, brand: p.brand, category: p.category,
      price: String(p.price), originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      description: p.description || '', image: p.image || '',
      specs:  Array.isArray(p.specs)  ? p.specs.join(', ')  : p.specs  || '',
      colors: Array.isArray(p.colors) ? p.colors.join(', ') : p.colors || '',
      badge: p.badge || '', inStock: p.inStock !== false,
      rating: String(p.rating || 4.5), reviews: String(p.reviews || 0),
    });
    setErrors({}); setModal('edit');
  };
  const openDel    = (p) => { setSelected(p); setModal('delete'); };
  const closeModal = () => { setModal(null); setSelected(null); setSaving(false); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Enter a valid price';
    if (!form.image.trim()) e.image = 'Image URL required';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    if (modal === 'add') {
      const res = await addProduct(form);
      toast.success(res.success ? 'Product saved to MongoDB ✓' : 'Product added locally (backend offline)');
    } else {
      const id = selected._id || selected.id;
      await updateProduct(id, form);
      toast.success('Product updated ✓');
    }
    setSaving(false);
    closeModal();
  };

  const handleDelete = async () => {
    setSaving(true);
    const id = selected._id || selected.id;
    await deleteProduct(id);
    toast.success('Product deleted ✓');
    closeModal();
  };

  const discount = (p) => p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;

  const FormBody = () => (
    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Product Name *" error={errors.name}>
          <input value={form.name} onChange={set('name')} className="input" placeholder="e.g. MacBook Pro 16″ M3" />
        </Field>
        <Field label="Brand">
          <select value={form.brand} onChange={set('brand')} className="input">
            {BRANDS.map(b => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={set('category')} className="input">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Badge">
          <select value={form.badge} onChange={set('badge')} className="input">
            {BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
          </select>
        </Field>
        <Field label="Price (₹) *" error={errors.price}>
          <input type="number" value={form.price} onChange={set('price')} className="input" placeholder="24990" />
        </Field>
        <Field label="Original Price (₹)">
          <input type="number" value={form.originalPrice} onChange={set('originalPrice')} className="input" placeholder="Leave blank if no discount" />
        </Field>
        <Field label="Rating (0–5)">
          <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={set('rating')} className="input" />
        </Field>
        <Field label="Reviews Count">
          <input type="number" value={form.reviews} onChange={set('reviews')} className="input" placeholder="0" />
        </Field>
      </div>

      <Field label="Image URL *" error={errors.image}>
        <input value={form.image} onChange={set('image')} className="input" placeholder="https://images.unsplash.com/…" />
        {form.image && (
          <div className="mt-2 flex gap-3 items-center">
            <img src={form.image} alt="preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200"
              onError={e => { e.target.style.display = 'none'; }} />
            <p className="text-xs text-slate-400">Image preview</p>
          </div>
        )}
      </Field>

      <Field label="Description">
        <textarea value={form.description} onChange={set('description')} rows={3} className="input resize-none" placeholder="Brief product description…" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Specs (comma-separated)">
          <textarea value={form.specs} onChange={set('specs')} rows={2} className="input resize-none text-xs" placeholder="RAM: 16GB, Storage: 512GB, …" />
        </Field>
        <Field label="Colors (comma-separated)">
          <input value={form.colors} onChange={set('colors')} className="input" placeholder="Black, Silver, Blue" />
        </Field>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl"
        style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}>
        <div>
          <p className="text-sm font-semibold text-secondary-900">In Stock</p>
          <p className="text-xs text-slate-400">Toggle product availability</p>
        </div>
        <button type="button" onClick={setBool('inStock')}>
          {form.inStock
            ? <ToggleRight size={32} style={{ color: '#22c55e' }} />
            : <ToggleLeft  size={32} style={{ color: '#94a3b8' }} />}
        </button>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={closeModal} className="btn btn-ghost flex-1" disabled={saving}>Cancel</button>
        <button onClick={handleSave} disabled={saving}
          className="btn flex-1 text-white font-semibold gap-2"
          style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
          {saving
            ? <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Saving…
              </span>
            : <><Check size={16} /> {modal === 'add' ? 'Add Product' : 'Save Changes'}</>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary-900">Products</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-secondary-500">{products.length} products in catalogue</p>
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${apiAvailable ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
              {apiAvailable ? <Wifi size={10} /> : <WifiOff size={10} />}
              {apiAvailable ? 'MongoDB live' : 'Local mode'}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={refreshProducts} className="btn btn-ghost gap-2 text-secondary-500" title="Refresh from DB">
            <RefreshCw size={16} />
          </button>
          <button onClick={openAdd}
            className="btn text-white gap-2"
            style={{ background: 'linear-gradient(135deg,#2563eb,#06b6d4)', boxShadow: '0 6px 20px rgba(37,99,235,0.3)' }}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products…" className="input pl-10 text-sm" />
        </div>
        <select value={catFilter} onChange={e => setCat(e.target.value)} className="input text-sm w-auto min-w-[140px]">
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {(search || catFilter) && (
          <button onClick={() => { setSearch(''); setCat(''); }} className="btn btn-ghost btn-sm gap-1 text-secondary-500">
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={card}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(248,250,252,0.8)', borderBottom: '1px solid rgba(226,232,240,0.6)' }}>
                <th className="text-left px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider hidden sm:table-cell">Rating</th>
                <th className="text-left px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr><td colSpan={6} className="text-center py-16 text-secondary-400">
                  <Package size={40} className="mx-auto mb-3 opacity-30" />
                  No products found.
                </td></tr>
              )}
              {list.map((p, i) => (
                <tr key={p._id || p.id}
                  style={{ borderBottom: i < list.length - 1 ? '1px solid rgba(226,232,240,0.5)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        style={{ border: '1px solid rgba(226,232,240,0.6)' }}
                        onError={e => { e.target.src = 'https://via.placeholder.com/48'; }} />
                      <div className="min-w-0">
                        <p className="font-semibold text-secondary-900 truncate max-w-[180px]">{p.name}</p>
                        <p className="text-xs text-secondary-400">{p.brand}</p>
                        {p.badge && (
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold mt-0.5
                            ${p.badge === 'SALE' ? 'bg-red-50 text-red-600' : p.badge === 'NEW' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="capitalize text-xs text-secondary-600 font-medium">{p.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-secondary-900">₹{Number(p.price).toLocaleString()}</p>
                    {discount(p) && <p className="text-xs text-emerald-600 font-semibold">-{discount(p)}%</p>}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                      <span className="text-xs font-semibold text-secondary-700">{p.rating}</span>
                      <span className="text-xs text-secondary-400">({(p.reviews || 0).toLocaleString()})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${p.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {p.inStock ? '● In Stock' : '○ Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(p)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-secondary-400 transition-all"
                        style={{ background: 'rgba(248,250,252,0.8)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; e.currentTarget.style.color = '#2563eb'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,250,252,0.8)'; e.currentTarget.style.color = '#94a3b8'; }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => openDel(p)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-secondary-400 transition-all"
                        style={{ background: 'rgba(248,250,252,0.8)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#ef4444'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,250,252,0.8)'; e.currentTarget.style.color = '#94a3b8'; }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 text-xs text-secondary-400" style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
          Showing {list.length} of {products.length} products
        </div>
      </div>

      {(modal === 'add' || modal === 'edit') && (
        <Modal title={modal === 'add' ? 'Add New Product' : `Edit: ${selected?.name}`} onClose={closeModal}>
          <FormBody />
        </Modal>
      )}

      {modal === 'delete' && (
        <Modal title="Delete Product" onClose={closeModal}>
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(239,68,68,0.08)' }}>
              <Trash2 size={28} style={{ color: '#ef4444' }} />
            </div>
            <p className="font-semibold text-secondary-900 mb-2">Are you sure?</p>
            <p className="text-sm text-secondary-500 mb-6">
              <strong>"{selected?.name}"</strong> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={closeModal} className="btn btn-ghost flex-1" disabled={saving}>Cancel</button>
              <button onClick={handleDelete} disabled={saving}
                className="btn flex-1 text-white font-semibold"
                style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}>
                {saving ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
