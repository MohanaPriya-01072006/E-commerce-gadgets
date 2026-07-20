import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, Button, TextField, 
  Stepper, Step, StepLabel, Card, Divider, FormControlLabel, Radio, RadioGroup 
} from '@mui/material';
import { useCart } from '../Context/CartContext';
import Footer from '../Components/Footer';

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const tax = cartTotal * 0.18;
  const shipping = cartTotal > 10000 ? 0 : 500;
  const finalTotal = cartTotal + tax + shipping;

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setPlacingOrder(true);
      try {
        const orderData = {
          orderItems: cartItems.map(item => ({
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id || item.id,
          })),
          shippingAddress: {
            address: formValues.address1 || '123 Main St',
            city: formValues.city || 'Mumbai',
            postalCode: formValues.zip || '400001',
            country: formValues.country || 'India',
          },
          paymentMethod: 'Card',
          itemsPrice: cartTotal,
          taxPrice: tax,
          shippingPrice: shipping,
          totalPrice: finalTotal,
        };
        
        // Import api inside the component to avoid circular dependency if not at top level
        const api = require('../Services/api').default;
        await api.post('/orders', orderData);
        
        clearCart();
        navigate('/order-success');
      } catch (err) {
        console.error("Error placing order", err);
        alert("Failed to place order. Please try again.");
      } finally {
        setPlacingOrder(false);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField required id="firstName" name="firstName" label="First name" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="lastName" name="lastName" label="Last name" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="address1" name="address1" label="Address line 1" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField id="address2" name="address2" label="Address line 2" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="city" name="city" label="City" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="zip" name="zip" label="Zip / Postal code" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required id="country" name="country" label="Country" fullWidth variant="outlined" onChange={handleChange} />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Payment Method</Typography>
            <RadioGroup defaultValue="creditCard">
              <FormControlLabel value="creditCard" control={<Radio />} label="Credit / Debit Card" />
              <FormControlLabel value="upi" control={<Radio />} label="UPI (Google Pay, PhonePe)" />
              <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
            
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField required id="cardName" label="Name on card" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField required id="cardNumber" label="Card number" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField required id="expDate" label="Expiry date" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField required id="cvv" label="CVV" helperText="Last three digits on signature strip" fullWidth />
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography fontWeight={600}>₹{(item.price * item.quantity).toLocaleString()}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography fontWeight={600}>₹{cartTotal.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Tax (18% GST)</Typography>
              <Typography fontWeight={600}>₹{tax.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography fontWeight={600}>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={800}>Total</Typography>
              <Typography variant="h5" fontWeight={900} color="primary.main">₹{finalTotal.toLocaleString()}</Typography>
            </Box>
          </Box>
        );
      default:
        throw new Error('Unknown step');
    }
  };

  if (cartItems.length === 0 && activeStep === 0) {
    return (
      <Box sx={{ pt: 10, textAlign: 'center', minHeight: '80vh' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Your cart is empty.</Typography>
        <Button variant="contained" onClick={() => navigate('/products')}>Return to Shop</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="md" sx={{ py: 8, flexGrow: 1 }}>
        <Card sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <Typography component="h1" variant="h4" align="center" sx={{ fontWeight: 800, mb: 4 }}>
            Checkout
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <React.Fragment>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6, gap: 2 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} variant="outlined" sx={{ px: 4 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={placingOrder}
                sx={{ px: 4 }}
              >
                {placingOrder ? 'Processing...' : activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        </Card>
      </Container>
      <Footer />
    </Box>
  );
}
