import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Grid, CircularProgress, Chip, Snackbar, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, InputLabel, FormControl,
} from '@mui/material';
import { Add, Edit, Delete, Search, Inventory2 } from '@mui/icons-material';
import api from '../../Services/api';

const CATEGORIES = ['Smartphones', 'Laptops', 'Wearables', 'Audio', 'Tablets', 'Cameras', 'Gaming'];
const BRANDS = ['Samsung', 'Apple', 'Sony', 'OnePlus', 'Xiaomi', 'Dell', 'Bose', 'JBL'];

const emptyProduct = {
  name: '', brand: '', category: '', price: '', originalPrice: '', description: '', image: '',
  specs: '', countInStock: '', badge: '', rating: 0, reviews: 0,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleOpen = (product = null) => {
    if (product) {
      setEditProduct(product);
      setForm({
        ...product,
        specs: Array.isArray(product.specs) ? product.specs.join(', ') : product.specs || '',
      });
    } else {
      setEditProduct(null);
      setForm(emptyProduct);
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditProduct(null);
    setForm(emptyProduct);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        countInStock: Number(form.countInStock) || 0,
        rating: Number(form.rating) || 0,
        reviews: Number(form.reviews) || 0,
        specs: typeof form.specs === 'string' ? form.specs.split(',').map((s) => s.trim()).filter(Boolean) : form.specs,
      };

      if (editProduct) {
        await api.put(`/products/${editProduct._id}`, payload);
        setToast({ open: true, message: 'Product updated successfully!', severity: 'success' });
      } else {
        await api.post('/products', payload);
        setToast({ open: true, message: 'Product created successfully!', severity: 'success' });
      }

      handleClose();
      fetchProducts();
    } catch (err) {
      setToast({ open: true, message: err.response?.data?.message || 'Error saving product', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setToast({ open: true, message: 'Product deleted!', severity: 'success' });
      fetchProducts();
    } catch (err) {
      setToast({ open: true, message: 'Error deleting product', severity: 'error' });
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>Products</Typography>
          <Typography sx={{ color: '#64748b', mt: 0.5 }}>Manage your product catalog</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}
          sx={{ bgcolor: '#8e176f', '&:hover': { bgcolor: '#6d0f54' }, fontWeight: 700, px: 3 }}>
          Add Product
        </Button>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #e2e8f0' }}>
        <Search sx={{ color: '#94a3b8' }} />
        <TextField
          placeholder="Search products by name, brand, or category..."
          variant="standard"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ '& input': { fontSize: 14 } }}
        />
        <Chip label={`${filtered.length} products`} size="small" sx={{ fontWeight: 600 }} />
      </Card>

      {/* Products Table */}
      <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>PRODUCT</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>CATEGORY</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>PRICE</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>STOCK</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>RATING</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 6 }}>
                  <Inventory2 sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                  <Typography sx={{ color: '#94a3b8' }}>No products found</Typography>
                </TableCell></TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p._id} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box component="img" src={p.image} alt={p.name} sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1.5 }} />
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{p.name}</Typography>
                          <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{p.brand}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell><Chip label={p.category} size="small" variant="outlined" sx={{ fontWeight: 600, fontSize: 11 }} /></TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>₹{p.price?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip label={p.countInStock > 0 ? `${p.countInStock} in stock` : 'Out of stock'} size="small"
                        color={p.countInStock > 0 ? 'success' : 'error'} variant="outlined" sx={{ fontWeight: 600, fontSize: 11 }} />
                    </TableCell>
                    <TableCell><Typography sx={{ fontSize: 13 }}>⭐ {p.rating}</Typography></TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleOpen(p)} sx={{ color: '#3b82f6' }}><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(p._id)} sx={{ color: '#ef4444' }}><Delete fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{editProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField name="name" label="Product Name" fullWidth value={form.name} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select name="brand" value={form.brand} label="Brand" onChange={handleChange}>
                  {BRANDS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={form.category} label="Category" onChange={handleChange}>
                  {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="price" label="Price (₹)" type="number" fullWidth value={form.price} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField name="originalPrice" label="Original Price" type="number" fullWidth value={form.originalPrice || ''} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="description" label="Description" fullWidth multiline rows={3} value={form.description} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField name="image" label="Image URL" fullWidth value={form.image} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField name="specs" label="Specs (comma separated)" fullWidth value={form.specs} onChange={handleChange} helperText="e.g. 6.7 inch AMOLED, 256GB Storage, 108MP Camera" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="countInStock" label="Stock Count" type="number" fullWidth value={form.countInStock} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="badge" label="Badge (SALE, HOT, NEW)" fullWidth value={form.badge} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField name="rating" label="Rating" type="number" fullWidth value={form.rating} onChange={handleChange} inputProps={{ min: 0, max: 5, step: 0.1 }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: '#64748b' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}
            sx={{ bgcolor: '#8e176f', '&:hover': { bgcolor: '#6d0f54' }, fontWeight: 700, px: 4 }}>
            {saving ? <CircularProgress size={22} /> : editProduct ? 'Update Product' : 'Create Product'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ fontWeight: 600 }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
}
