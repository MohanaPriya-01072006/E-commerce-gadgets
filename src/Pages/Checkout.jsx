import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box, Container, Grid, Typography, Button, Card, CardContent,
  Stepper, Step, StepLabel, TextField, Radio, RadioGroup,
  FormControlLabel, FormLabel, Divider, Alert, Chip,
} from "@mui/material";
import {
  LocalShipping, Payment, ArrowBack, ArrowForward, Lock,
} from "@mui/icons-material";
import { useCart } from "../Context/CartContext";

const STEPS = ["Shipping", "Payment", "Review"];

function StepShipping({ data, onChange, errors }) {
  const fields = [
    { name: "firstName", label: "First Name", xs: 6 },
    { name: "lastName", label: "Last Name", xs: 6 },
    { name: "email", label: "Email Address", xs: 12, type: "email" },
    { name: "phone", label: "Phone Number", xs: 12, type: "tel" },
    { name: "address", label: "Street Address", xs: 12 },
    { name: "city", label: "City", xs: 6 },
    { name: "state", label: "State", xs: 6 },
    { name: "pincode", label: "PIN Code", xs: 6 },
  ];
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <LocalShipping color="primary" /> Shipping Details
      </Typography>
      <Grid container spacing={2.5}>
        {fields.map((f) => (
          <Grid item xs={12} sm={f.xs} key={f.name}>
            <TextField
              label={f.label} fullWidth size="medium" type={f.type || "text"}
              value={data[f.name] || ""} onChange={(e) => onChange(f.name, e.target.value)}
              error={!!errors[f.name]} helperText={errors[f.name]}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, p: 2, bgcolor: "primary.light", borderRadius: 2, border: "1px solid", borderColor: "primary.main", display: "flex", alignItems: "center", gap: 1.5 }}>
        <LocalShipping sx={{ color: "primary.main" }} />
        <Typography variant="body2" sx={{ color: "primary.dark", fontWeight: 600 }}>
          Free express delivery on orders over ₹10,000. Standard delivery ₹299.
        </Typography>
      </Box>
    </Box>
  );
}

function StepPayment({ data, onChange }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <Payment color="primary" /> Payment Method
      </Typography>
      <FormLabel sx={{ fontWeight: 600, color: "text.primary", display: "block", mb: 1.5 }}>Select how you'd like to pay</FormLabel>
      <RadioGroup value={data.method || "card"} onChange={(e) => onChange("method", e.target.value)}>
        {[
          { value: "card", label: "💳 Credit / Debit Card" },
          { value: "upi", label: "📱 UPI (GPay, PhonePe, Paytm)" },
          { value: "netbanking", label: "🏦 Net Banking" },
          { value: "cod", label: "🏠 Cash on Delivery" },
        ].map((opt) => (
          <Card key={opt.value} variant="outlined" sx={{ mb: 1.5, border: "1.5px solid", borderColor: data.method === opt.value ? "primary.main" : "divider", cursor: "pointer", transition: "border-color 0.2s" }} onClick={() => onChange("method", opt.value)}>
            <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
              <FormControlLabel value={opt.value} control={<Radio color="primary" />} label={<Typography sx={{ fontWeight: 600 }}>{opt.label}</Typography>} sx={{ m: 0 }} />
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      {(data.method === "card" || !data.method) && (
        <Box sx={{ mt: 2, p: 3, bgcolor: "background.default", borderRadius: 2.5, border: "1px solid", borderColor: "divider" }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456" size="medium"
                value={data.cardNumber || ""} onChange={(e) => onChange("cardNumber", e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Cardholder Name" size="medium"
                value={data.cardName || ""} onChange={(e) => onChange("cardName", e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Expiry (MM/YY)" placeholder="08/28" size="medium"
                value={data.expiry || ""} onChange={(e) => onChange("expiry", e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="CVV" placeholder="•••" type="password" size="medium"
                value={data.cvv || ""} onChange={(e) => onChange("cvv", e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
            </Grid>
          </Grid>
        </Box>
      )}
      {data.method === "upi" && (
        <Box sx={{ mt: 2, p: 3, bgcolor: "background.default", borderRadius: 2.5, border: "1px solid", borderColor: "divider" }}>
          <TextField fullWidth label="UPI ID" placeholder="yourname@upi" size="medium"
            value={data.upiId || ""} onChange={(e) => onChange("upiId", e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
        </Box>
      )}
      <Alert severity="info" icon={<Lock fontSize="small" />} sx={{ mt: 2.5, borderRadius: 2 }}>
        All transactions are secured with 256-bit SSL encryption.
      </Alert>
    </Box>
  );
}

function StepReview({ shipping, payment, cartItems, cartTotal }) {
  const discount = cartTotal > 10000 ? 0 : 299;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + discount + tax;
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Review Your Order</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>SHIPPING TO</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 2 }}>
              {shipping.firstName} {shipping.lastName}<br />
              {shipping.address}, {shipping.city}<br />
              {shipping.state} — {shipping.pincode}<br />
              {shipping.phone}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>PAYMENT</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 2 }}>
              Method: {payment.method === "card" ? "Credit / Debit Card" : payment.method === "upi" ? "UPI" : payment.method === "netbanking" ? "Net Banking" : "Cash on Delivery"}
              {payment.method === "card" && payment.cardNumber && (
                <><br />Card ending in ···· {payment.cardNumber.slice(-4)}</>
              )}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2.5, overflow: "hidden" }}>
            <Box sx={{ p: 2, bgcolor: "background.default", borderBottom: "1px solid", borderColor: "divider" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>ORDER ITEMS ({cartItems.length})</Typography>
            </Box>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ display: "flex", gap: 2, p: 2, borderBottom: "1px solid", borderColor: "divider", "&:last-child": { borderBottom: "none" } }}>
                <Box sx={{ width: 56, height: 56, borderRadius: 1.5, overflow: "hidden", flexShrink: 0, bgcolor: "grey.100" }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>{item.name}</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>Qty: {item.quantity}</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{(item.price * item.quantity).toLocaleString()}</Typography>
              </Box>
            ))}
            <Box sx={{ p: 2, bgcolor: "background.default" }}>
              {[["Subtotal", `₹${cartTotal.toLocaleString()}`], ["Shipping", discount === 0 ? "FREE" : `₹${discount}`], ["GST (18%)", `₹${tax.toLocaleString()}`]].map(([k, v]) => (
                <Box key={k} sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>{k}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: v === "FREE" ? "success.main" : "text.primary" }}>{v}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Total</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "primary.main" }}>₹{total.toLocaleString()}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function validate(step, data) {
  const errors = {};
  if (step === 0) {
    if (!data.firstName?.trim()) errors.firstName = "Required";
    if (!data.lastName?.trim()) errors.lastName = "Required";
    if (!data.email?.trim()) errors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid email";
    if (!data.phone?.trim()) errors.phone = "Required";
    if (!data.address?.trim()) errors.address = "Required";
    if (!data.city?.trim()) errors.city = "Required";
    if (!data.state?.trim()) errors.state = "Required";
    if (!data.pincode?.trim()) errors.pincode = "Required";
  }
  return errors;
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [shipping, setShipping] = useState({});
  const [payment, setPayment] = useState({ method: "card" });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (cartItems.length === 0 && activeStep < 3) {
    return (
      <Box sx={{ textAlign: "center", py: 16 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Your cart is empty.</Typography>
        <Button component={RouterLink} to="/shop" variant="contained">Go Shopping</Button>
      </Box>
    );
  }

  const handleShippingChange = (name, value) => setShipping((p) => ({ ...p, [name]: value }));
  const handlePaymentChange = (name, value) => setPayment((p) => ({ ...p, [name]: value }));

  const handleNext = () => {
    if (activeStep === 0) {
      const errs = validate(0, shipping);
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
    }
    setActiveStep((s) => s + 1);
  };

  const handleBack = () => setActiveStep((s) => s - 1);

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => { clearCart(); navigate("/order-success"); }, 1800);
  };

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, textAlign: "center" }}>Secure Checkout</Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
          {STEPS.map((label, i) => (
            <Step key={label} completed={activeStep > i}>
              <StepLabel><Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography></StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: { xs: 2.5, md: 4 } }}>
              {activeStep === 0 && <StepShipping data={shipping} onChange={handleShippingChange} errors={errors} />}
              {activeStep === 1 && <StepPayment data={payment} onChange={handlePaymentChange} />}
              {activeStep === 2 && <StepReview shipping={shipping} payment={payment} cartItems={cartItems} cartTotal={cartTotal} />}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, gap: 2 }}>
                <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack />} variant="outlined" sx={{ px: 3 }}>
                  Back
                </Button>
                {activeStep < 2 ? (
                  <Button onClick={handleNext} endIcon={<ArrowForward />} variant="contained" sx={{ px: 4 }}>
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handlePlaceOrder} variant="contained" size="large" startIcon={<Lock />}
                    disabled={placing} sx={{ px: 5, py: 1.5, fontWeight: 800 }}>
                    {placing ? "Placing Order…" : "Place Order"}
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>

          {/* Mini summary sidebar */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ position: { lg: "sticky" }, top: 100 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  Order Items <Chip label={cartItems.length} size="small" color="primary" sx={{ ml: 1 }} />
                </Typography>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 1.5, overflow: "hidden", flexShrink: 0, bgcolor: "grey.100" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: "text.primary", display: "block", lineHeight: 1.3 }}>{item.name}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>×{item.quantity} — ₹{(item.price * item.quantity).toLocaleString()}</Typography>
                    </Box>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Total</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "primary.main" }}>
                    ₹{(cartTotal + Math.round(cartTotal * 0.18) + (cartTotal > 10000 ? 0 : 299)).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1, color: "success.main" }}>
                  <Lock fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Secured by 256-bit SSL</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
