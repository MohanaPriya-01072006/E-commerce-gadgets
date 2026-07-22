import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CircularProgress, Chip, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Avatar, InputAdornment,
} from '@mui/material';
import { Search, Person } from '@mui/icons-material';
import api from '../../Services/api';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/auth/users');
        setCustomers(data);
      } catch (err) {
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.name?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 3 }}>
        Customers
      </Typography>

      {/* Search */}
      <Card sx={{ p: 2, mb: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
        <TextField
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ width: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#94a3b8', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      {/* Table */}
      <Card sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 13 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 13 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 13 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#475569', fontSize: 13 }}>Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8, color: '#94a3b8' }}>
                    <Person sx={{ fontSize: 48, mb: 1, display: 'block', mx: 'auto', color: '#e2e8f0' }} />
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((customer) => (
                  <TableRow key={customer._id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            fontSize: 14,
                            fontWeight: 700,
                            background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
                          }}
                        >
                          {customer.name?.[0]?.toUpperCase() || '?'}
                        </Avatar>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>
                          {customer.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: 14, color: '#475569' }}>{customer.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={customer.role || 'user'}
                        size="small"
                        color={customer.role === 'admin' ? 'primary' : 'default'}
                        sx={{ fontWeight: 600, fontSize: 12 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: 14, color: '#475569' }}>
                      {customer.createdAt
                        ? new Date(customer.createdAt).toLocaleDateString()
                        : '—'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
