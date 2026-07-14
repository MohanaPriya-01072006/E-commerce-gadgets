import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography, Button, Grid, Card, CardContent, Divider } from "@mui/material";
import { CheckCircle, ShoppingBag, Home, LocalShipping, Support } from "@mui/icons-material";

const orderId = `MX-${Math.floor(100000 + Math.random() * 900000)}`;

export default function OrderSuccess() {
  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 6, md: 12 }, minHeight: "80vh" }}>
      <Container maxWidth="sm">
        {/* Success Icon */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Box sx={{
            width: 96, height: 96, mx: "auto", mb: 3,
            background: "linear-gradient(135deg,#dcfce7,#bbf7d0)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(22,163,74,0.2)",
            animation: "bounce-in 0.5s ease forwards",
          }}>
            <CheckCircle sx={{ fontSize: 52, color: "success.main" }} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 900, color: "text.primary", mb: 1.5 }}>Order Confirmed!</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7, maxWidth: 440, mx: "auto" }}>
            Thank you for shopping with MopriX! Your premium gadgets are being prepared for express dispatch. You'll receive a confirmation email shortly.
          </Typography>
        </Box>

        {/* Order ID Card */}
        <Card sx={{ mb: 4, textAlign: "center" }}>
          <CardContent sx={{ p: 3.5 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>Your Order ID</Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main", letterSpacing: 1 }}>{orderId}</Typography>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>Save this for tracking your order.</Typography>
          </CardContent>
        </Card>

        {/* What happens next */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5 }}>What Happens Next?</Typography>
            {[
              { icon: <CheckCircle color="success" />, title: "Order Confirmed", desc: "Your order has been placed and payment received.", done: true },
              { icon: <LocalShipping color="primary" />, title: "Processing & Dispatch", desc: "We'll prepare and dispatch within 24 hours.", done: false },
              { icon: <ShoppingBag color="action" />, title: "Out for Delivery", desc: "You'll receive a tracking link via SMS and email.", done: false },
            ].map((step, idx) => (
              <Box key={step.title}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", py: 1.5 }}>
                  <Box sx={{ mt: 0.3, flexShrink: 0 }}>{step.icon}</Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: step.done ? "success.main" : "text.primary" }}>{step.title}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>{step.desc}</Typography>
                  </Box>
                </Box>
                {idx < 2 && <Divider sx={{ ml: 5 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Button component={RouterLink} to="/shop" variant="contained" fullWidth size="large" startIcon={<ShoppingBag />} sx={{ py: 1.75 }}>
              Continue Shopping
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button component={RouterLink} to="/" variant="outlined" fullWidth size="large" startIcon={<Home />} sx={{ py: 1.75 }}>
              Back to Home
            </Button>
          </Grid>
        </Grid>

        {/* Support */}
        <Box sx={{ textAlign: "center", p: 3, bgcolor: "background.paper", borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
          <Support sx={{ color: "primary.main", mb: 1 }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Need help? Contact our support team at{" "}
            <Box component="a" href="mailto:support@moprix.in" sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none" }}>
              support@moprix.in
            </Box>{" "}
            or call <strong>+91 98765 43210</strong>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
