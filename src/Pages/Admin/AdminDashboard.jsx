import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, Typography, CircularProgress, Avatar, Chip, Divider
} from '@mui/material';
import {
  TrendingUp, ShoppingCart, Inventory2, AttachMoney, PendingActions, LocalShipping,
} from '@mui/icons-material';
import api from '../../Services/api';

function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <Card sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', bgcolor: `${color}15` }} />
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#64748b', mb: 0.5 }}>{title}</Typography>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>{value}</Typography>
          {subtitle && <Typography sx={{ fontSize: 12, color: '#94a3b8', mt: 0.5 }}>{subtitle}</Typography>}
        </Box>
        <Avatar sx={{ bgcolor: `${color}20`, color: color, width: 48, height: 48 }}>
          {icon}
        </Avatar>
      </Box>
    </Card>
  );
}

const statusColors = {
  Pending: 'warning',
  Processing: 'info',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'error',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, productsRes] = await Promise.all([
          api.get('/orders/stats'),
          api.get('/products'),
        ]);
        setStats(statsRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error('Dashboard data error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>Dashboard</Typography>
        <Typography sx={{ color: '#64748b', mt: 0.5 }}>Welcome back! Here's what's happening with your store.</Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} icon={<AttachMoney />} color="#10b981" subtitle="Lifetime earnings" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Orders" value={stats?.totalOrders || 0} icon={<ShoppingCart />} color="#3b82f6" subtitle="All time" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Products" value={products.length} icon={<Inventory2 />} color="#8b5cf6" subtitle="In catalog" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Orders" value={stats?.pendingOrders || 0} icon={<PendingActions />} color="#f59e0b" subtitle="Need attention" />
        </Grid>
      </Grid>

      {/* Analytics Chart */}
      <Box sx={{ mb: 4 }}>
        <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', p: 3, bgcolor: '#ffffff' }}>
          <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 3 }}>Revenue Analytics (Last 7 Days)</Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 220, gap: 2, pt: 2 }}>
            {[
              { day: 'Mon', revenue: 12000 },
              { day: 'Tue', revenue: 19000 },
              { day: 'Wed', revenue: 15000 },
              { day: 'Thu', revenue: 22000 },
              { day: 'Fri', revenue: 28000 },
              { day: 'Sat', revenue: 35000 },
              { day: 'Sun', revenue: 29000 },
            ].map(data => (
              <Box key={data.day} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: '100%', 
                  background: 'linear-gradient(180deg, #3b82f6 0%, #93c5fd 100%)',
                  height: `${(data.revenue / 35000) * 100}%`,
                  borderRadius: '6px 6px 0 0',
                  transition: 'all 0.3s ease',
                  '&:hover': { opacity: 0.8, cursor: 'pointer' }
                }} title={`₹${data.revenue.toLocaleString()}`} />
                <Typography sx={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{data.day}</Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Recent Orders</Typography>
              <Chip label={`${stats?.totalOrders || 0} total`} size="small" sx={{ fontWeight: 600 }} />
            </Box>
            <Divider />
            {stats?.recentOrders?.length > 0 ? (
              stats.recentOrders.map((order) => (
                <Box key={order._id} sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', '&:hover': { bgcolor: '#f8fafc' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#ede9fe', color: '#7c3aed', fontSize: 13, fontWeight: 700 }}>
                      {order.user?.name?.charAt(0)?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{order.user?.name || 'Guest'}</Typography>
                      <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip label={order.status} color={statusColors[order.status] || 'default'} size="small" sx={{ fontWeight: 600, fontSize: 11 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>₹{order.totalPrice?.toLocaleString()}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <LocalShipping sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>No orders yet</Typography>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <Box sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Top Products</Typography>
            </Box>
            <Divider />
            {products.slice(0, 5).map((product) => (
              <Box key={product._id} sx={{ px: 3, py: 2, display: 'flex', gap: 2, alignItems: 'center', borderBottom: '1px solid #f1f5f9', '&:hover': { bgcolor: '#f8fafc' } }}>
                <Box component="img" src={product.image} alt={product.name} sx={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 1.5 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</Typography>
                  <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{product.category} · {product.brand}</Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>₹{product.price?.toLocaleString()}</Typography>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
