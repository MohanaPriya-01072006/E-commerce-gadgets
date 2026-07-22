import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, Grid3X3, List, ChevronDown, Search, Star } from 'lucide-react';
import ProductCard from '../Components/ProductCard';
import { useProducts } from '../Context/ProductContext';

const BRANDS = ['Apple','Samsung','Sony','Dell','HP','Lenovo','Bose','JBL','Razer','Logitech','OnePlus','Amazon'];
const SORT_OPTIONS = [
  { value:'default', label:'Featured' },
  { value:'price_asc', label:'Price: Low to High' },
  { value:'price_desc', label:'Price: High to Low' },
  { value:'rating', label:'Highest Rated' },
  { value:'reviews', label:'Most Reviewed' },
];

function RangeSlider({ min, max, value, onChange }) {
  return (
    <div className="px-1">
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-secondary-200 dark:bg-secondary-700 rounded-full appearance-none cursor-pointer accent-primary" />
      <div className="flex justify-between text-xs text-secondary-500 mt-1.5">
        <span>₹{min.toLocaleString()}</span><span>₹{value.toLocaleString()}</span>
      </div>
    </div>
  );
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-secondary-100 dark:border-secondary-700 pb-4 mb-4">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between py-1 font-semibold text-sm text-secondary-900 dark:text-white">
        {title} <ChevronDown size={16} className={`text-secondary-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function Shop() {
  const { products, categories } = useProducts();
  const [searchParams] = useSearchParams();
  const initCat = searchParams.get('category') || '';
  const initSearch = searchParams.get('search') || '';
  const initBadge = searchParams.get('badge') || '';

  const [selectedCats, setSelectedCats] = useState(initCat ? [initCat] : []);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(350000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('default');
  const [searchQuery, setSearchQuery] = useState(initSearch);
  const [gridView, setGridView] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const toggleCat = c => setSelectedCats(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleBrand = b => setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b]);

  const clearAll = () => { setSelectedCats([]); setSelectedBrands([]); setMaxPrice(350000); setMinRating(0); setInStockOnly(false); setSearchQuery(''); };

  const activeFilterCount = selectedCats.length + selectedBrands.length + (maxPrice < 350000 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && !p.inStock) return false;
      if (initBadge && p.badge !== initBadge) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      case 'reviews': return [...list].sort((a, b) => b.reviews - a.reviews);
      default: return list;
    }
  }, [selectedCats, selectedBrands, maxPrice, minRating, inStockOnly, sort, searchQuery, initBadge]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const FiltersPanel = () => (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-secondary-900 dark:text-white">Filters {activeFilterCount > 0 && <span className="badge badge-primary ml-1">{activeFilterCount}</span>}</span>
        {activeFilterCount > 0 && <button onClick={clearAll} className="text-xs text-danger font-semibold hover:underline">Clear All</button>}
      </div>

      <FilterSection title="Category">
        {categories.map(c => (
          <label key={c.id} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
            <input type="checkbox" checked={selectedCats.includes(c.slug)} onChange={() => toggleCat(c.slug)} className="w-4 h-4 rounded accent-primary" />
            <span className="text-sm text-secondary-700 dark:text-secondary-300 group-hover:text-primary transition-colors flex items-center gap-1.5">
              <span>{c.icon}</span>{c.name}
            </span>
            <span className="ml-auto text-xs text-secondary-400">{c.count}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Brand">
        {BRANDS.map(b => (
          <label key={b} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
            <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="w-4 h-4 rounded accent-primary" />
            <span className="text-sm text-secondary-700 dark:text-secondary-300 group-hover:text-primary transition-colors">{b}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Max Price">
        <RangeSlider min={1000} max={350000} value={maxPrice} onChange={v => setMaxPrice(v)} />
      </FilterSection>

      <FilterSection title="Min Rating" defaultOpen={false}>
        {[4.5, 4, 3.5, 3].map(r => (
          <label key={r} className="flex items-center gap-2 py-1.5 cursor-pointer">
            <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-primary" />
            <span className="flex items-center gap-1 text-sm">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(r) ? 'text-warning fill-warning' : 'text-secondary-300'} />)}
              <span className="text-secondary-500 dark:text-secondary-400 text-xs">& above</span>
            </span>
          </label>
        ))}
        {minRating > 0 && <button onClick={() => setMinRating(0)} className="text-xs text-danger mt-1">Clear rating</button>}
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="w-4 h-4 rounded accent-primary" />
          <span className="text-sm text-secondary-700 dark:text-secondary-300">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-100 dark:border-secondary-800 py-8 px-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-xs text-secondary-400 mb-3">
            <Link to="/" className="hover:text-primary">Home</Link><span>/</span><span className="text-secondary-600 dark:text-secondary-300 font-medium">Shop</span>
          </nav>
          <h1 className="section-title mb-1">All Products</h1>
          <p className="text-sm text-secondary-500 dark:text-secondary-400">{filtered.length} products found</p>
        </div>
      </div>

      <div className="container-custom px-4 sm:px-6 py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card p-5 sticky top-24"><FiltersPanel /></div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {/* Mobile filter btn */}
              <button onClick={() => setDrawerOpen(true)} className="lg:hidden btn btn-outline btn-sm gap-2">
                <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && <span className="badge badge-primary">{activeFilterCount}</span>}
              </button>

              {/* Search */}
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }} placeholder="Search in results…"
                  className="input pl-9 py-2 text-sm w-full" />
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-secondary-500 hidden sm:block">{filtered.length} items</span>
                {/* Sort */}
                <select value={sort} onChange={e => setSort(e.target.value)} className="input py-2 text-sm w-auto pr-8">
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {/* View toggle */}
                <div className="flex border border-secondary-200 dark:border-secondary-700 rounded-xl overflow-hidden">
                  <button onClick={() => setGridView(true)} className={`p-2 transition-colors ${gridView ? 'bg-primary text-white' : 'bg-white dark:bg-secondary-800 text-secondary-400 hover:text-primary'}`}><Grid3X3 size={16} /></button>
                  <button onClick={() => setGridView(false)} className={`p-2 transition-colors ${!gridView ? 'bg-primary text-white' : 'bg-white dark:bg-secondary-800 text-secondary-400 hover:text-primary'}`}><List size={16} /></button>
                </div>
              </div>
            </div>

            {/* Active chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCats.map(c => <span key={c} onClick={() => toggleCat(c)} className="chip chip-active cursor-pointer gap-1 text-xs">{c} <X size={12} /></span>)}
                {selectedBrands.map(b => <span key={b} onClick={() => toggleBrand(b)} className="chip chip-active cursor-pointer gap-1 text-xs">{b} <X size={12} /></span>)}
              </div>
            )}

            {/* Products grid */}
            {paginated.length === 0 ? (
              <div className="card py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-xl text-secondary-900 dark:text-white mb-2">No products found</h3>
                <p className="text-secondary-500 mb-5">Try adjusting your filters or search query.</p>
                <button onClick={clearAll} className="btn btn-primary">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className={gridView ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
                  {paginated.map(p => gridView ? <ProductCard key={p.id} product={p} /> : (
                    <div key={p.id} className="card flex gap-4 p-4 hover:shadow-card-hover transition-all">
                      <Link to={`/product/${p.id}`} className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-secondary-50">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-primary mb-0.5">{p.brand}</p>
                        <Link to={`/product/${p.id}`} className="font-semibold text-secondary-900 dark:text-white hover:text-primary transition-colors line-clamp-2 text-sm">{p.name}</Link>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_,i) => <Star key={i} size={11} className={i < Math.round(p.rating) ? 'text-warning fill-warning' : 'text-secondary-300'} />)}
                          <span className="text-xs text-secondary-400">({p.reviews.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-black text-lg text-secondary-900 dark:text-white">₹{p.price.toLocaleString()}</span>
                          {p.originalPrice && <span className="text-sm text-secondary-400 line-through">₹{p.originalPrice.toLocaleString()}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn btn-ghost btn-sm disabled:opacity-40">Prev</button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${page === i + 1 ? 'bg-primary text-white' : 'btn btn-ghost btn-sm'}`}>{i + 1}</button>
                    ))}
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn btn-ghost btn-sm disabled:opacity-40">Next</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {drawerOpen && <div onClick={() => setDrawerOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white dark:bg-secondary-900 z-50 shadow-glass p-6 overflow-y-auto transform transition-transform duration-300 lg:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-5">
          <span className="font-bold text-lg text-secondary-900 dark:text-white">Filters</span>
          <button onClick={() => setDrawerOpen(false)} className="btn-icon text-secondary-500"><X size={20} /></button>
        </div>
        <FiltersPanel />
        <button onClick={() => setDrawerOpen(false)} className="btn btn-primary w-full mt-4">Show {filtered.length} Results</button>
      </aside>
    </div>
  );
}
