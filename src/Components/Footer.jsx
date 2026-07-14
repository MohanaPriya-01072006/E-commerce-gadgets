import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  Box, Container, Grid, Typography, TextField, Button, 
  IconButton, Link 
} from "@mui/material";

const footerLinks = {
  Shop: [
    { label: "All Products", to: "/shop" },
    { label: "Smartphones", to: "/shop" },
    { label: "Laptops", to: "/shop" },
    { label: "Wearables", to: "/shop" },
    { label: "Audio", to: "/shop" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "FAQ", to: "/faq" },
    { label: "Careers", to: "/about" },
  ],
  Support: [
    { label: "Track Order", to: "/contact" },
    { label: "Returns", to: "/faq" },
    { label: "Warranty", to: "/faq" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};

const socials = [
  { label: "Twitter/X", icon: "𝕏", href: "#" },
  { label: "Instagram", icon: "📸", href: "#" },
  { label: "YouTube", icon: "▶", href: "#" },
  { label: "LinkedIn", icon: "in", href: "#" },
];

const payments = ["Visa", "Mastercard", "UPI", "PayTM", "RazorPay"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <Box component="footer" sx={{ bgcolor: '#0f172a', color: '#e2e8f0' }}>

      {/* Newsletter Strip */}
      <Box sx={{ background: "linear-gradient(90deg,#1e3a5f,#2563eb,#7c3aed,#1e3a5f)", py: 6, px: 3 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="overline" sx={{ fontWeight: 600, color: "#bfdbfe", letterSpacing: 2, display: 'block', mb: 1 }}>
            Stay In The Loop
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1.5 }}>
            Get Exclusive Deals & Early Access
          </Typography>
          <Typography variant="body1" sx={{ color: "#93c5fd", mb: 3.5 }}>
            Join 50,000+ subscribers. No spam, unsubscribe anytime.
          </Typography>
          {subscribed ? (
            <Box sx={{ background: "rgba(255,255,255,0.15)", borderRadius: 3, p: 2, display: "inline-flex", alignItems: "center", gap: 1.5, color: "#fff", fontWeight: 600 }}>
              ✅ You're subscribed! Watch your inbox.
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: "flex", gap: 1.5, maxWidth: 480, mx: "auto", flexWrap: "wrap", justifyContent: "center" }}>
              <TextField
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                variant="outlined"
                size="small"
                sx={{ 
                  flex: 1, minWidth: 220, bgcolor: '#fff', borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '& input': { py: 1.5 }
                }}
              />
              <Button type="submit" variant="contained" sx={{ bgcolor: '#fff', color: 'primary.main', '&:hover': { bgcolor: '#f8fafc' }, px: 3, py: 1.5, fontWeight: 700 }}>
                Subscribe →
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Main Footer */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 5 }}>
        <Grid container spacing={5}>
          
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box component={RouterLink} to="/" sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", mb: 2 }}>
              <Box sx={{ width: 40, height: 40, borderRadius: 2.5, background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16 }}>MX</Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#f8fafc" }}>MopriX Gadgets</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.7, mb: 3 }}>
              India's most trusted destination for premium tech. Curated gadgets, genuine products, fast delivery.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {socials.map(s => (
                <IconButton 
                  key={s.label}
                  component="a" 
                  href={s.href}
                  title={s.label}
                  sx={{
                    width: 36, height: 36, borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                    color: "#94a3b8", fontSize: 13, fontWeight: 700,
                    '&:hover': { bgcolor: 'primary.main', color: '#fff', borderColor: 'primary.main' }
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <Grid item xs={6} sm={4} md={2} key={heading}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f1f5f9", mb: 2, letterSpacing: 0.5, textTransform: "uppercase" }}>
                {heading}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {links.map(l => (
                  <li key={l.label}>
                    <Link component={RouterLink} to={l.to} sx={{ color: "#94a3b8", typography: 'body2', textDecoration: "none", '&:hover': { color: 'primary.light' } }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Contact info */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f1f5f9", mb: 2, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { icon: "📍", text: "MG Road, Bangalore, India 560001" },
                { icon: "📞", text: "+91 98765 43210" },
                { icon: "✉️", text: "support@moprix.in" },
                { icon: "🕐", text: "Mon–Sat, 9 AM – 7 PM" },
              ].map(c => (
                <Box key={c.text} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <Typography variant="body2" sx={{ mt: 0.2 }}>{c.icon}</Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.5 }}>{c.text}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Trust badges row */}
        <Box sx={{ mt: 6, pt: 4, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
          {[
            { icon: "🔒", label: "100% Secure Payments" },
            { icon: "✅", label: "Genuine Products" },
            { icon: "🚚", label: "Free Express Delivery" },
            { icon: "↩️", label: "Easy Returns" },
            { icon: "🏆", label: "Award Winning Service" },
          ].map(b => (
            <Box key={b.label} sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 1, borderRadius: 2, bgcolor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <Typography sx={{ fontSize: 16 }}>{b.icon}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: "#94a3b8" }}>{b.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Payment methods */}
        <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
          {payments.map(p => (
            <Box component="span" key={p} sx={{ px: 1.5, py: 0.5, borderRadius: 1.5, bgcolor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
              {p}
            </Box>
          ))}
        </Box>

        {/* Bottom bar */}
        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "#475569" }}>
            © 2026 MopriX Gadgets Pvt. Ltd. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {[{ label: "Privacy", to: "/privacy" }, { label: "Terms", to: "/terms" }].map(l => (
              <Link key={l.to} component={RouterLink} to={l.to} sx={{ typography: 'caption', color: "#475569", textDecoration: "none", '&:hover': { color: 'primary.light' } }}>
                {l.label}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
