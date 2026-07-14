import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box, Container, Grid, Typography, Button, Card, CardContent,
  IconButton, TextField, Divider, Chip, Alert, Tooltip,
} from "@mui/material";
import {
  Add, Remove, Delete, ShoppingCartOutlined, ArrowForward,
  LocalShipping, Lock, VerifiedUser,
} from "@mui/icons-material";
import { useCart } from "../Context/CartContext";

const COUPONS = { MOPRIX10: 10, SAVE20: 20, FLAT500: 0 };

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code] !== undefined) {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try MOPRIX10 or SAVE20.");
      setAppliedCoupon(null);
    }
  };

  const discountPct = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const discountAmt = Math.round(cartTotal * discountPct / 100);
  const shipping = cartTotal > 10000 ? 0 : 299;
  const tax = Math.round((cartTotal - discountAmt) * 0.18);
  const total = cartTotal - discountAmt + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 16, px: 3, minHeight: "60vh" }}>
        <ShoppingCartOutlined sx={{ fontSize: 80, color: "text.disabled", mb: 3 }} />
        <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 1.5 }}>Your Cart is Empty</Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>Looks like you haven't added any premium gadgets yet.</Typography>
        <Button component={RouterLink} to="/shop" variant="contained" size="large" sx={{ px: 5, py: 1.5 }}>
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 4 }}>
          Shopping Cart <Chip label={`${cartItems.length} item${cartItems.length > 1 ? "s" : ""}`} color="primary" size="small" sx={{ ml: 1, fontWeight: 700 }} />
        </Typography>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cartItems.map((item) => (
                <Card key={item.id} sx={{ overflow: "visible" }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 }, "&:last-child": { pb: 3 } }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Image */}
                      <Grid item xs={3} sm={2}>
                        <Box component={RouterLink} to={`/product/${item.id}`} sx={{ display: "block", borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider", aspectRatio: "1", bgcolor: "grey.50" }}>
                          <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </Box>
                      </Grid>

                      {/* Details */}
                      <Grid item xs={9} sm={10}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, lineHeight: 1 }}>{item.category}</Typography>
                            <Typography variant="subtitle1" component={RouterLink} to={`/product/${item.id}`} sx={{ fontWeight: 700, color: "text.primary", textDecoration: "none", display: "block", lineHeight: 1.3, mb: 0.5, "&:hover": { color: "primary.main" } }}>
                              {item.name}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
                              ₹{item.price.toLocaleString()}
                            </Typography>
                          </Box>
                          <Tooltip title="Remove item">
                            <IconButton size="small" onClick={() => removeFromCart(item.id)} sx={{ color: "text.disabled", "&:hover": { color: "error.main", bgcolor: "error.light" } }}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, flexWrap: "wrap", gap: 1 }}>
                          {/* Qty Control */}
                          <Box sx={{ display: "flex", alignItems: "center", border: "1.5px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
                            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} sx={{ borderRadius: 0, px: 1 }}>
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ px: 2, fontWeight: 700, minWidth: 36, textAlign: "center" }}>{item.quantity}</Typography>
                            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ borderRadius: 0, px: 1 }}>
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                            Subtotal: <Box component="span" sx={{ fontWeight: 800, color: "text.primary" }}>₹{(item.price * item.quantity).toLocaleString()}</Box>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Footer actions */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, flexWrap: "wrap", gap: 2 }}>
              <Button startIcon={<Delete />} onClick={clearCart} color="error" variant="text" sx={{ fontWeight: 600 }}>
                Clear Cart
              </Button>
              <Button component={RouterLink} to="/shop" variant="text" sx={{ fontWeight: 600 }}>
                ← Continue Shopping
              </Button>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ position: { lg: "sticky" }, top: 100 }}>
              <CardContent sx={{ p: 3.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Order Summary</Typography>

                {/* Coupon */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "text.secondary" }}>Have a coupon?</Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      size="small" placeholder="Enter code" fullWidth
                      value={coupon} onChange={(e) => setCoupon(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                    <Button variant="outlined" onClick={handleApplyCoupon} sx={{ whiteSpace: "nowrap", fontWeight: 700 }}>Apply</Button>
                  </Box>
                  {couponError && <Alert severity="error" sx={{ mt: 1, py: 0.5, fontSize: 12 }}>{couponError}</Alert>}
                  {appliedCoupon && <Alert severity="success" sx={{ mt: 1, py: 0.5, fontSize: 12 }}>🎉 {discountPct}% discount applied!</Alert>}
                </Box>

                <Divider sx={{ mb: 2.5 }} />

                {/* Line items */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>Subtotal</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{cartTotal.toLocaleString()}</Typography>
                  </Box>
                  {discountAmt > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" sx={{ color: "success.main" }}>Discount ({appliedCoupon})</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>-₹{discountAmt.toLocaleString()}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>Shipping</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: shipping === 0 ? "success.main" : "text.primary" }}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>GST (18%)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{tax.toLocaleString()}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2.5 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main" }}>₹{total.toLocaleString()}</Typography>
                </Box>

                <Button
                  variant="contained" fullWidth size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/checkout")}
                  sx={{ py: 1.75, fontSize: "1rem", fontWeight: 700 }}
                >
                  Proceed to Checkout
                </Button>

                {/* Trust signals */}
                <Box sx={{ mt: 2.5, display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    { icon: <Lock fontSize="small" />, text: "Secure SSL Checkout" },
                    { icon: <LocalShipping fontSize="small" />, text: "Free shipping on orders over ₹10,000" },
                    { icon: <VerifiedUser fontSize="small" />, text: "100% Genuine Products" },
                  ].map((t) => (
                    <Box key={t.text} sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                      {React.cloneElement(t.icon, { sx: { color: "success.main" } })}
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>{t.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
