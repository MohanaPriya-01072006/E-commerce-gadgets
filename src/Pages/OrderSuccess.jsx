import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import Footer from '../Components/Footer';

export default function OrderSuccess() {
  // Generate a random order number
  const orderNumber = `MX-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="sm" sx={{ py: 10, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
          
          <CheckCircleOutline sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: 'text.primary' }}>
            Order Placed Successfully!
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6 }}>
            Thank you for your purchase. Your order <Box component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>#{orderNumber}</Box> has been received and is currently being processed. You will receive an email confirmation shortly.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button 
              component={RouterLink} 
              to="/products" 
              variant="contained" 
              size="large"
              sx={{ py: 1.5, fontWeight: 700 }}
            >
              Continue Shopping
            </Button>
            
            <Button 
              component={RouterLink} 
              to="/" 
              variant="outlined" 
              size="large"
              sx={{ py: 1.5, fontWeight: 700 }}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
