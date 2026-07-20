import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Grid, IconButton, Rating, Stack, Typography, CircularProgress } from '@mui/material';
import { FiArrowRight, FiHeadphones, FiHeart, FiMonitor, FiPackage, FiPlus, FiShield, FiShoppingBag, FiSmartphone, FiTruck, FiWatch } from 'react-icons/fi';
import { useCart } from '../Context/CartContext';
import api from '../Services/api';

const categoryTiles = [
  { name: 'Smartphones', icon: <FiSmartphone />, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Laptops', icon: <FiMonitor />, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80' },
  { name: 'Audio', icon: <FiHeadphones />, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Wearables', icon: <FiWatch />, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
  { name: 'Gaming', icon: <FiMonitor />, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cameras', icon: <FiPackage />, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80' },
];

function ProductCard({ product }) {
  const [saved, setSaved] = useState(false);
  const { addToCart } = useCart();
  return <Card sx={{ overflow: 'hidden', height: '100%', borderRadius: 2.5, border: '1px solid #e7e5e9', boxShadow: 'none', '&:hover': { boxShadow: '0 8px 24px rgba(60,11,85,.10)' } }}><Box sx={{ height: 210, bgcolor: '#f5eef5', p: 1.5, position: 'relative' }}><Box component="img" src={product.image} alt={product.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1.5 }} />{product.badge && <Chip label={product.badge} size="small" sx={{ position: 'absolute', top: 14, left: 14, bgcolor: '#8e176f', color: '#fff', fontWeight: 800, fontSize: 10 }} />}<IconButton onClick={() => setSaved(!saved)} sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#fff', color: saved ? '#8e176f' : '#555', width: 32, height: 32 }}><FiHeart fill={saved ? 'currentColor' : 'none'} size={16} /></IconButton></Box><CardContent sx={{ p: 1.8 }}><Typography sx={{ color: '#777184', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{product.brand}</Typography><Typography component={RouterLink} to={`/product/${product._id || product.id}`} sx={{ display: 'block', textDecoration: 'none', color: '#172033', fontWeight: 700, mt: .45, height: 44, lineHeight: 1.35, '&:hover': { color: '#8e176f' } }}>{product.name}</Typography><Stack direction="row" alignItems="center" spacing={.5} sx={{ mt: .8 }}><Rating value={product.rating || 0} precision={.1} size="small" readOnly /><Typography sx={{ color: '#777184', fontSize: 11 }}>{(product.reviews || 0).toLocaleString()}</Typography></Stack><Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.25 }}><Box><Typography sx={{ fontWeight: 800 }}>₹{product.price.toLocaleString()}</Typography>{product.originalPrice && <Typography component="span" sx={{ fontSize: 11, color: '#8c8794', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</Typography>}</Box><IconButton onClick={() => addToCart(product)} sx={{ bgcolor: '#8e176f', color: '#fff', width: 35, height: 35, borderRadius: 1.5, '&:hover': { bgcolor: '#6d0f54' } }}><FiPlus /></IconButton></Stack></CardContent></Card>;
}

export default function Homepage() {
  const [active, setActive] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchProducts();
  }, []);

  const filtered = active === 'All' ? products : products.filter((product) => product.category === active);
  
  return <Box sx={{ bgcolor: '#fff' }}>
    <Box component="section" sx={{ bgcolor: '#8e176f', color: '#fff', overflow: 'hidden', position: 'relative', minHeight: { xs: 410, md: 405 } }}><Box sx={{ position: 'absolute', inset: 0, opacity: .24, backgroundImage: 'radial-gradient(circle at 12px 12px, #fff 1.5px, transparent 1.8px)', backgroundSize: '25px 25px' }} /><Box sx={{ position: 'absolute', left: { xs: '-110px', md: '8%' }, bottom: { xs: '-160px', md: '-225px' }, width: { xs: 350, md: 570 }, height: { xs: 350, md: 570 }, border: '22px solid #ff6971', borderRadius: '50%', opacity: .9 }} /><Box sx={{ position: 'absolute', left: { xs: '-75px', md: '12%' }, bottom: { xs: '-128px', md: '-190px' }, width: { xs: 280, md: 470 }, height: { xs: 280, md: 470 }, border: '16px solid #5ad8ed', borderRadius: '50%' }} /><Container maxWidth={false} sx={{ maxWidth: 1480, position: 'relative', minHeight: { xs: 410, md: 405 }, display: 'flex', alignItems: 'center' }}><Grid container alignItems="center" spacing={3}><Grid item xs={12} md={7} sx={{ zIndex: 1 }}><Box sx={{ maxWidth: 570, pl: { md: 6 }, py: { xs: 6, md: 0 } }}><Typography sx={{ fontSize: { xs: 13, md: 15 }, letterSpacing: '.13em', fontWeight: 800, color: '#ffd7ec' }}>MOPRIX APP EXCLUSIVE</Typography><Typography sx={{ fontSize: { xs: '2.6rem', sm: '3.7rem', md: '4.2rem' }, fontWeight: 800, lineHeight: 1.03, letterSpacing: '-.05em', mt: 1 }}>Smart shopping.<br />Real savings.</Typography><Typography sx={{ fontSize: { xs: 16, md: 19 }, color: '#fde1f1', mt: 2, lineHeight: 1.5 }}>Genuine gadgets, low prices, and delivery you can count on.</Typography><Button component={RouterLink} to="/shop" variant="contained" endIcon={<FiArrowRight />} sx={{ bgcolor: '#fff', color: '#5e0b50', px: 4, py: 1.4, mt: 3.5, fontSize: 17, '&:hover': { bgcolor: '#fcecf6' } }}>Shop Now</Button></Box></Grid><Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}><Box component="img" src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=850&q=85" alt="Latest gadgets" sx={{ height: 405, width: '100%', objectFit: 'cover', objectPosition: 'center', mixBlendMode: 'screen', opacity: .93 }} /></Grid></Grid></Container></Box>
    <Box sx={{ borderBottom: '1px solid #f1cce7', borderTop: '1px solid #f1cce7', bgcolor: '#fffafb' }}><Container maxWidth="lg"><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" divider={<Box sx={{ width: { sm: '1px' }, height: { sm: 22 }, bgcolor: '#f0d6e7' }} />} spacing={{ xs: .8, sm: 5 }} sx={{ py: 1.65 }}>{[{ icon: <FiTruck />, text: '7 Days Easy Return' }, { icon: '₹', text: 'Cash on Delivery' }, { icon: <FiShoppingBag />, text: 'Lowest Prices' }].map((item) => <Stack direction="row" alignItems="center" spacing={1} key={item.text} sx={{ color: '#302334', fontSize: 14 }}><Box sx={{ color: '#a3147d', fontWeight: 800 }}>{item.icon}</Box><Typography sx={{ fontSize: 14 }}>{item.text}</Typography></Stack>)}</Stack></Container></Box>
    <Container maxWidth={false} sx={{ maxWidth: 1480, py: { xs: 5, md: 7 } }}><Typography align="center" sx={{ fontSize: { xs: 23, md: 29 }, fontWeight: 800, color: '#302334', mb: 4 }}>Shop by category</Typography><Stack direction="row" justifyContent={{ xs: 'flex-start', md: 'space-between' }} spacing={{ xs: 2.4, md: 2 }} sx={{ overflowX: 'auto', pb: 1 }}>{categoryTiles.map((item) => <Box component={RouterLink} to={`/shop?category=${item.name}`} key={item.name} sx={{ textDecoration: 'none', minWidth: { xs: 118, md: 150 }, textAlign: 'center', color: '#302334' }}><Box sx={{ height: { xs: 112, md: 146 }, width: { xs: 112, md: 146 }, mx: 'auto', borderRadius: '50% 50% 15% 15%', p: .8, bgcolor: '#f6eaf3', overflow: 'hidden' }}><Box component="img" src={item.image} alt={item.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50% 50% 13% 13%' }} /></Box><Typography sx={{ fontWeight: 700, fontSize: 14, mt: 1 }}>{item.name}</Typography></Box>)}</Stack></Container>
    <Box sx={{ bgcolor: '#faf7fa', borderTop: '1px solid #efebef', py: { xs: 5, md: 7 } }}><Container maxWidth={false} sx={{ maxWidth: 1480 }}><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} sx={{ mb: 3 }}><Box><Typography sx={{ fontSize: 12, fontWeight: 800, color: '#8e176f', letterSpacing: '.11em' }}>TRENDING NOW</Typography><Typography sx={{ color: '#302334', fontWeight: 800, fontSize: { xs: 24, md: 30 } }}>Popular picks at great prices</Typography></Box><Stack direction="row" spacing={1} sx={{ mt: { xs: 2, sm: 0 }, flexWrap: 'wrap' }}>{['All', 'Audio', 'Smartphones', 'Laptops'].map((item) => <Chip label={item} key={item} onClick={() => setActive(item)} sx={{ mb: .5, bgcolor: active === item ? '#8e176f' : '#fff', color: active === item ? '#fff' : '#3b3140', fontWeight: 700, border: active === item ? 'none' : '1px solid #dfd8df' }} />)}</Stack></Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
      ) : (
        <Grid container spacing={2.3}>{filtered.slice(0, 8).map((product) => <Grid item xs={12} sm={6} md={3} key={product._id || product.id}><ProductCard product={product} /></Grid>)}</Grid>
      )}
      <Box sx={{ textAlign: 'center', mt: 4 }}><Button component={RouterLink} to="/shop" variant="contained" endIcon={<FiArrowRight />} sx={{ bgcolor: '#8e176f', '&:hover': { bgcolor: '#6d0f54' } }}>View All Products</Button></Box></Container></Box>
    <Container maxWidth={false} sx={{ maxWidth: 1480, py: { xs: 5, md: 7 } }}><Grid container spacing={2.5}><Grid item xs={12} md={8}><Box sx={{ minHeight: 260, bgcolor: '#f4e1ed', borderRadius: 2.5, p: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center' }}><Box><Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '.12em', color: '#8e176f' }}>THE MOPRIX PROMISE</Typography><Typography sx={{ color: '#302334', fontSize: { xs: 26, md: 38 }, fontWeight: 800, lineHeight: 1.12, mt: 1 }}>The gadget you want.<br />The confidence you need.</Typography><Button component={RouterLink} to="/about" endIcon={<FiArrowRight />} sx={{ color: '#8e176f', px: 0, mt: 2 }}>Why shop with us</Button></Box></Box></Grid><Grid item xs={12} md={4}><Stack spacing={2.5}>{[{ icon: <FiShield />, title: '100% Genuine Products', detail: 'Sourced from trusted distributors.' }, { icon: <FiTruck />, title: 'Delivery across India', detail: 'Fast and carefully packed.' }].map((item) => <Box key={item.title} sx={{ display: 'flex', gap: 1.5, p: 2.3, border: '1px solid #eadfe7', borderRadius: 2.5, bgcolor: '#fff' }}><Box sx={{ color: '#8e176f', fontSize: 22 }}>{item.icon}</Box><Box><Typography sx={{ fontWeight: 800, color: '#302334', fontSize: 14 }}>{item.title}</Typography><Typography sx={{ color: '#756b76', fontSize: 13, mt: .25 }}>{item.detail}</Typography></Box></Box>)}</Stack></Grid></Grid></Container>
  </Box>;
}
