import React, { useState } from "react";
import {
  Box, Container, Grid, Typography, Card, CardContent,
  Accordion, AccordionSummary, AccordionDetails, Button, Chip,
} from "@mui/material";
import { ExpandMore, Help, Email, Phone } from "@mui/icons-material";

const faqData = {
  Orders: [
    { q: "How do I track my order?", a: "Once your order is dispatched, you'll receive an SMS and email with a tracking link. You can also visit the 'Track Order' section in your account dashboard to see real-time updates." },
    { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing. Contact our support team immediately at support@moprix.in and we'll do our best to help." },
    { q: "How long does delivery take?", a: "Same-day delivery is available in Bangalore, Mumbai, Delhi, Chennai, Hyderabad and Pune for orders placed before 12 PM. Next-day delivery is available in 50+ cities. Standard delivery takes 2–5 business days for other locations." },
    { q: "Do you offer free shipping?", a: "Yes! All orders above ₹10,000 qualify for free express delivery. Orders below ₹10,000 have a flat shipping fee of ₹299." },
  ],
  Products: [
    { q: "Are all products on MopriX genuine and authentic?", a: "Absolutely. Every product we sell is sourced directly from the brand or their authorised Indian distributor. We maintain complete supply chain traceability and never deal in grey-market or refurbished goods." },
    { q: "Do products come with a manufacturer warranty?", a: "Yes. All products include the full standard manufacturer warranty — typically 1 to 2 years depending on the brand and product type. The warranty card is included in every box." },
    { q: "Can I view product specifications before buying?", a: "Yes. Each product page includes a full specifications tab with detailed tech specs, and a description tab with feature highlights. You can also compare products using our comparison tool on the product listing page." },
    { q: "What brands do you carry?", a: "We carry 120+ brands including Apple, Samsung, Sony, OnePlus, Xiaomi, Bose, JBL, Dell, HP, Lenovo, Asus, and many more. We're constantly adding new brands and products." },
  ],
  Payments: [
    { q: "What payment methods do you accept?", a: "We accept all major Credit and Debit Cards (Visa, Mastercard, RuPay), UPI (GPay, PhonePe, Paytm, BHIM), Net Banking from 50+ banks, EMI via select cards, and Cash on Delivery for orders up to ₹50,000." },
    { q: "Is it safe to enter my card details on MopriX?", a: "Yes. All transactions on MopriX are protected by 256-bit SSL encryption. We are PCI-DSS compliant and never store your full card details. Payments are processed through Razorpay, a RBI-regulated payment gateway." },
    { q: "Do you offer EMI options?", a: "Yes, no-cost EMI is available on orders above ₹5,000 with select credit cards from HDFC, ICICI, SBI, Axis, and Kotak. EMI options will be shown at checkout based on your card." },
    { q: "Can I use multiple payment methods for one order?", a: "Currently, we support one payment method per order. However, you can apply a coupon code before checkout to reduce your total, then pay the remaining amount via any single method." },
  ],
  Returns: [
    { q: "What is your return policy?", a: "We offer a 15-day no-questions-asked return policy on all products. The item must be unused, in its original packaging, with all accessories and the invoice. Simply raise a return request from your account or contact support." },
    { q: "How long does a refund take?", a: "Refunds are processed within 2 business days of receiving the returned item at our warehouse. The amount will be credited to your original payment method within 5–7 business days depending on your bank." },
    { q: "What if I receive a defective or wrong product?", a: "We're sorry if that happens! Please contact us within 48 hours of delivery with photos/video of the issue. We'll arrange an immediate replacement or full refund and a free pickup — no hassle at all." },
    { q: "Are there any items that cannot be returned?", a: "Certain items like opened software, digital download codes, and personalised products are non-returnable. This will be clearly mentioned on the product page before you purchase." },
  ],
  Account: [
    { q: "Do I need an account to place an order?", a: "You can browse and buy without an account as a guest. However, creating an account lets you track orders, save your wishlist, manage addresses, view order history, and access exclusive member deals." },
    { q: "How do I reset my password?", a: "Click 'Forgot Password' on the Sign In page and enter your registered email. You'll receive a reset link within a few minutes. Check your spam folder if you don't see it in your inbox." },
    { q: "Is my personal data safe with MopriX?", a: "Yes. We comply with India's Digital Personal Data Protection Act (DPDP). We never sell your data to third parties. You can request data deletion at any time by contacting privacy@moprix.in." },
  ],
};

const categories = Object.keys(faqData);

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Orders");
  const [expanded, setExpanded] = useState(false);

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <Container maxWidth="md">
          <Help sx={{ fontSize: 52, color: "primary.light", mb: 2 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, color: "#f8fafc", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" sx={{ color: "#94a3b8", fontWeight: 400, maxWidth: 500, mx: "auto" }}>
            Everything you need to know about shopping at MopriX.
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Box sx={{ bgcolor: "background.default", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {/* Category nav */}
            <Grid item xs={12} md={3}>
              <Card sx={{ position: { md: "sticky" }, top: 90, p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.secondary", mb: 2, px: 1, textTransform: "uppercase", letterSpacing: 1 }}>Categories</Typography>
                <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, gap: 0.75, flexWrap: "wrap" }}>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      fullWidth
                      onClick={() => { setActiveCategory(cat); setExpanded(false); }}
                      sx={{
                        justifyContent: { xs: "center", md: "flex-start" },
                        fontWeight: activeCategory === cat ? 700 : 500,
                        bgcolor: activeCategory === cat ? "primary.light" : "transparent",
                        color: activeCategory === cat ? "primary.main" : "text.secondary",
                        borderRadius: 2,
                        py: 1.25,
                        "&:hover": { bgcolor: "action.hover", color: "primary.main" },
                      }}
                    >
                      {cat}
                      <Chip label={faqData[cat].length} size="small" sx={{ ml: "auto", fontWeight: 700, height: 20, fontSize: 11, display: { xs: "none", md: "flex" }, bgcolor: activeCategory === cat ? "primary.main" : "grey.200", color: activeCategory === cat ? "#fff" : "text.secondary" }} />
                    </Button>
                  ))}
                </Box>
              </Card>
            </Grid>

            {/* Accordion */}
            <Grid item xs={12} md={9}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: "text.primary" }}>
                {activeCategory} <Typography component="span" variant="body1" sx={{ color: "text.secondary", fontWeight: 400 }}>— {faqData[activeCategory].length} questions</Typography>
              </Typography>
              {faqData[activeCategory].map((item, i) => (
                <Accordion
                  key={i}
                  expanded={expanded === i}
                  onChange={(_, isOpen) => setExpanded(isOpen ? i : false)}
                  disableGutters
                  sx={{
                    mb: 1.5, borderRadius: "12px !important", border: "1.5px solid",
                    borderColor: expanded === i ? "primary.main" : "divider",
                    "&:before": { display: "none" },
                    boxShadow: expanded === i ? "0 4px 20px rgba(37,99,235,0.1)" : "none",
                    overflow: "hidden",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: expanded === i ? "primary.main" : "text.secondary" }} />}
                    sx={{ px: 3, py: 1.5, "& .MuiAccordionSummary-content": { my: 1 } }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: expanded === i ? 700 : 600, color: expanded === i ? "primary.main" : "text.primary", lineHeight: 1.4 }}>
                      {item.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.85 }}>{item.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>

          {/* Still need help */}
          <Box sx={{ mt: 10, p: { xs: 3, md: 5 }, borderRadius: 4, background: "linear-gradient(135deg,#1e3a5f,#2563eb)", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#fff", mb: 1.5 }}>Still have questions?</Typography>
            <Typography variant="body1" sx={{ color: "#93c5fd", mb: 4 }}>Can't find what you're looking for? Our support team is happy to help.</Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button variant="contained" size="large" startIcon={<Email />} href="mailto:support@moprix.in"
                sx={{ bgcolor: "#fff", color: "primary.main", "&:hover": { bgcolor: "#f1f5f9" }, px: 4, py: 1.5, fontWeight: 700 }}>
                Email Support
              </Button>
              <Button variant="outlined" size="large" startIcon={<Phone />} href="tel:+919876543210"
                sx={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "#fff" }, px: 4, py: 1.5, fontWeight: 700 }}>
                Call Us
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
