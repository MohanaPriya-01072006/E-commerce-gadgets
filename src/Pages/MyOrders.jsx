import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Card, Chip, CircularProgress, Button, Divider
} from '@mui/material';
import { ShoppingBag, ArrowBack } from '@mui/icons-material';
import api from '../Services/api';
import { useAuth } from '../Context/AuthContext';

const statusColors = {
  Pending: 'warning',
  Processing: 'info',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'error',
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3, color: 'text.secondary' }}>Back</Button>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>My Orders</Typography>

        {orders.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 10 }}>
            <ShoppingBag sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>No orders yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Start shopping to see your orders here.</Typography>
            <Button variant="contained" onClick={() => navigate('/shop')}>Browse Products</Button>
          </Card>
        ) : (
          orders.map((order) => (
            <Card key={order._id} sx={{ mb: 3, p: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Order ID</Typography>
                  <Typography sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{order._id}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="text.secondary">Placed on</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {order.orderItems.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', gap: 2, mb: 1.5, alignItems: 'center' }}>
                  <Box component="img" src={item.image} alt={item.name} sx={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 1.5 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">Qty: {item.quantity}</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700 }}>₹{(item.price * item.quantity).toLocaleString()}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip label={order.status} color={statusColors[order.status] || 'default'} size="small" sx={{ fontWeight: 700 }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>₹{order.totalPrice?.toLocaleString()}</Typography>
              </Box>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}
