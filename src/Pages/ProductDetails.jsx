import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, Button, Rating, 
  Divider, Tab, Tabs, Chip, IconButton, Snackbar, Alert, CircularProgress 
} from '@mui/material';
import { 
  AddShoppingCart, Favorite, FavoriteBorder, LocalShipping, 
  Security, VerifiedUser, Remove, Add 
} from '@mui/icons-material';
import { useCart } from '../Context/CartContext';
import Footer from '../Components/Footer';
import api from '../Services/api';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Product not found or error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i=0; i<quantity; i++) {
      addToCart(product);
    }
    setToastOpen(true);
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}><CircularProgress /></Box>;
  if (error || !product) return <Box sx={{ textAlign: 'center', py: 20 }}><Typography variant="h5">{error || 'Product not found'}</Typography></Box>;

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Box sx={{ mb: 4, display: 'flex', gap: 1, color: 'text.secondary', typography: 'body2' }}>
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</RouterLink>
          <span>/</span>
          <RouterLink to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Products</RouterLink>
          <span>/</span>
          <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>{product.name}</Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 4, p: 2, position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <IconButton 
                onClick={() => setWished(!wished)} 
                sx={{ position: "absolute", top: 16, right: 16, zIndex: 2, bgcolor: wished ? '#fef2f2' : 'background.default', color: wished ? 'error.main' : 'text.secondary', '&:hover': { bgcolor: wished ? '#fee2e2' : '#f1f5f9' } }}
              >
                {wished ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Chip label={product.category} color="primary" size="small" sx={{ mb: 2, fontWeight: 700 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>{product.name}</Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Rating value={product.rating} precision={0.1} readOnly />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.5 }}>{product.rating}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary", textDecoration: 'underline', cursor: 'pointer' }}>
                Read {product.reviews.toLocaleString()} reviews
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 900, color: "primary.main" }}>₹{product.price.toLocaleString()}</Typography>
              {product.original && (
                <>
                  <Typography variant="h6" sx={{ color: "text.secondary", textDecoration: "line-through", mb: 0.5 }}>₹{product.original.toLocaleString()}</Typography>
                  <Chip label={`${discount}% OFF`} color="error" size="small" sx={{ mb: 1, fontWeight: 700 }} />
                </>
              )}
            </Box>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 4 }}>
              {product.description}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><Remove /></IconButton>
                <Typography sx={{ px: 3, fontWeight: 700 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}><Add /></IconButton>
              </Box>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                sx={{ flexGrow: 1, py: 1.5, fontSize: '1.1rem' }}
              >
                Add to Cart
              </Button>
            </Box>

            {/* Features */}
            <Grid container spacing={2}>
              {[
                { icon: <LocalShipping />, text: "Free Express Delivery" },
                { icon: <Security />, text: "1 Year Warranty" },
                { icon: <VerifiedUser />, text: "100% Genuine Product" },
              ].map((f, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    {f.icon}
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{f.text}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Tabs for Details & Specs */}
        <Box sx={{ mt: 8, mb: 8, bgcolor: '#fff', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f8fafc' }}>
            <Tab label="Specifications" sx={{ fontWeight: 700 }} />
            <Tab label="Reviews" sx={{ fontWeight: 700 }} />
          </Tabs>
          
          <Box sx={{ p: 4 }}>
            {tabValue === 0 && (
              <Grid container spacing={2}>
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, height: '100%' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{spec}</Typography>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Typography sx={{ color: 'text.secondary' }}>No specifications available.</Typography>
                )}
              </Grid>
            )}
            {tabValue === 1 && (
              <Typography sx={{ color: 'text.secondary' }}>Reviews section coming soon.</Typography>
            )}
          </Box>
        </Box>
      </Container>
      
      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%', fontWeight: 600 }}>
          Added to cart successfully!
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}
