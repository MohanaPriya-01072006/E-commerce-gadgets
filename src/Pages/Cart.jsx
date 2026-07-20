import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, Button, IconButton, 
  Card, Divider, TextField 
} from '@mui/material';
import { Add, Remove, DeleteOutline, ArrowBack } from '@mui/icons-material';
import { useCart } from '../Context/CartContext';
import Footer from '../Components/Footer';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const tax = cartTotal * 0.18; // 18% GST
  const shipping = cartTotal > 10000 ? 0 : 500;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ py: 6, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Shopping Cart</Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#fff', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>🛒</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Your cart is empty</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 4 }}>Looks like you haven't added anything yet.</Typography>
            <Button component={RouterLink} to="/products" variant="contained" size="large">
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Box sx={{ bgcolor: '#fff', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Items ({cartItems.length})</Typography>
                  <Button component={RouterLink} to="/products" startIcon={<ArrowBack />} size="small" sx={{ color: 'text.secondary' }}>
                    Continue Shopping
                  </Button>
                </Box>
                
                {cartItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Box sx={{ p: 3, display: 'flex', gap: 3, alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' } }}>
                      <Box sx={{ width: 100, height: 100, borderRadius: 2, bgcolor: '#f8fafc', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{item.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>{item.category}</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>₹{item.price.toLocaleString()}</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 2 }}>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><Remove fontSize="small" /></IconButton>
                          <Typography sx={{ px: 2, fontWeight: 600 }}>{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Add fontSize="small" /></IconButton>
                        </Box>
                        <IconButton color="error" onClick={() => removeFromCart(item.id)}><DeleteOutline /></IconButton>
                      </Box>
                    </Box>
                    {index < cartItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Order Summary</Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight={600}>₹{cartTotal.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography color="text.secondary">Tax (18% GST)</Typography>
                  <Typography fontWeight={600}>₹{tax.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography fontWeight={600}>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>₹{finalTotal.toLocaleString()}</Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Promo Code</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField size="small" placeholder="Enter code" fullWidth />
                    <Button variant="outlined">Apply</Button>
                  </Box>
                </Box>

                <Button 
                  component={RouterLink} 
                  to="/checkout" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ py: 1.5, fontSize: '1.1rem' }}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
}
