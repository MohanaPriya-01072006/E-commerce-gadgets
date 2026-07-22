import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as localProducts, categories as localCategories } from '../Data/products';
import api from '../Services/api';

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

// Normalise a product from the API (uses _id) into the shape the frontend expects (id)
const normalise = (p) => ({
  ...p,
  id: p._id || p.id,
  inStock: p.inStock !== false,
  images: p.images?.length ? p.images : [p.image],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts]   = useState(localProducts);
  const [loading, setLoading]     = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  /* ── Load products from API on mount; fall back to local data ── */
  useEffect(() => {
    let cancelled = false;
    api.get('/products')
      .then(({ data }) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map(normalise));
          setApiAvailable(true);
        }
        // If API returns empty array keep local seed data
      })
      .catch(() => {
        // Backend offline → use local seed
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  /* ── Derived slices ── */
  const bestSellers = products.filter(p => p.reviews > 3000).slice(0, 8);
  const newArrivals  = products.filter(p => p.badge === 'NEW').slice(0, 8);
  const flashDeals   = products.filter(p => p.badge === 'SALE').slice(0, 4);

  /* ── CRUD — always hits API when available ── */
  const addProduct = useCallback(async (form) => {
    const payload = {
      name:          form.name,
      brand:         form.brand,
      category:      form.category,
      price:         Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      rating:        Number(form.rating) || 4.5,
      reviews:       Number(form.reviews) || 0,
      badge:         form.badge || '',
      image:         form.image,
      images:        [form.image],
      description:   form.description || '',
      specs:         Array.isArray(form.specs)
                       ? form.specs
                       : (form.specs || '').split(',').map(s => s.trim()).filter(Boolean),
      colors:        Array.isArray(form.colors)
                       ? form.colors
                       : (form.colors || '').split(',').map(s => s.trim()).filter(Boolean),
      inStock:       form.inStock !== false,
      countInStock:  form.inStock !== false ? 100 : 0,
    };
    try {
      const { data } = await api.post('/products', payload);
      const newProduct = normalise(data);
      setProducts(prev => [newProduct, ...prev]);
      return { success: true, product: newProduct };
    } catch (err) {
      // Fallback: local only
      const newProduct = { ...payload, id: Date.now(), _id: null };
      setProducts(prev => [newProduct, ...prev]);
      return { success: false, product: newProduct };
    }
  }, []);

  const updateProduct = useCallback(async (id, form) => {
    const payload = {
      name:          form.name,
      brand:         form.brand,
      category:      form.category,
      price:         Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      rating:        Number(form.rating) || 4.5,
      reviews:       Number(form.reviews) || 0,
      badge:         form.badge || '',
      image:         form.image,
      images:        [form.image],
      description:   form.description || '',
      specs:         Array.isArray(form.specs)
                       ? form.specs
                       : (form.specs || '').split(',').map(s => s.trim()).filter(Boolean),
      colors:        Array.isArray(form.colors)
                       ? form.colors
                       : (form.colors || '').split(',').map(s => s.trim()).filter(Boolean),
      inStock:       form.inStock !== false,
      countInStock:  form.inStock !== false ? 100 : 0,
    };
    try {
      const { data } = await api.put(`/products/${id}`, payload);
      const updated = normalise(data);
      setProducts(prev => prev.map(p => (p.id === id || p._id === id) ? updated : p));
    } catch {
      setProducts(prev => prev.map(p => {
        if (p.id !== id && p._id !== id) return p;
        return { ...p, ...payload };
      }));
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      await api.delete(`/products/${id}`);
    } catch { /* ignore — still remove locally */ }
    setProducts(prev => prev.filter(p => p.id !== id && p._id !== id));
  }, []);

  const getProductById = useCallback((id) => {
    return products.find(p => String(p.id) === String(id) || String(p._id) === String(id));
  }, [products]);

  const refreshProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products');
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data.map(normalise));
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      apiAvailable,
      categories: localCategories,
      bestSellers,
      newArrivals,
      flashDeals,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      refreshProducts,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
