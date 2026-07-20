import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CircularProgress, Chip, Snackbar, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Select, MenuItem, FormControl, TextField, Avatar,
} from '@mui/material';
import { Search, LocalShipping } from '@mui/icons-material';
import api from '../../Services/api';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const statusColors = {
  Pending: 'warning',
  Processing: 'info',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'error',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setToast({ open: true, message: `Order status updated to ${newStatus}`, severity: 'success' });
      fetchOrders();
    } catch (err) {
      setToast({ open: true, message: 'Error updating order status', severity: 'error' });
    }
  };

  const filtered = orders.filter((o) => {
    const term = searchTerm.toLowerCase();
    return (
      o._id.toLowerCase().includes(term) ||
      o.user?.name?.toLowerCase().includes(term) ||
      o.user?.email?.toLowerCase().includes(term) ||
      o.status.toLowerCase().includes(term)
    );
  });

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>Orders</Typography>
        <Typography sx={{ color: '#64748b', mt: 0.5 }}>Manage and track customer orders</Typography>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3, p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #e2e8f0' }}>
        <Search sx={{ color: '#94a3b8' }} />
        <TextField
          placeholder="Search by order ID, customer name, or status..."
          variant="standard"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ '& input': { fontSize: 14 } }}
        />
        <Chip label={`${filtered.length} orders`} size="small" sx={{ fontWeight: 600 }} />
      </Card>

      <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>ORDER ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>CUSTOMER</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>ITEMS</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>TOTAL</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>DATE</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 12, color: '#64748b' }}>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 6 }}>
                  <LocalShipping sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                  <Typography sx={{ color: '#94a3b8' }}>No orders found</Typography>
                </TableCell></TableRow>
              ) : (
                filtered.map((order) => (
                  <TableRow key={order._id} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                    <TableCell>
                      <Typography sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600 }}>
                        #{order._id.slice(-8).toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#ede9fe', color: '#7c3aed', fontSize: 12, fontWeight: 700 }}>
                          {order.user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{order.user?.name || 'Guest'}</Typography>
                          <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{order.user?.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 13 }}>{order.orderItems?.length || 0} items</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700, fontSize: 13 }}>₹{order.totalPrice?.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: 12, color: '#64748b' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 130 }}>
                        <Select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          sx={{ fontSize: 12, fontWeight: 600, borderRadius: 2, '& .MuiSelect-select': { py: 0.8 } }}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>
                              <Chip label={s} color={statusColors[s]} size="small" sx={{ fontWeight: 600, fontSize: 11, width: '100%' }} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ fontWeight: 600 }}>{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
}
