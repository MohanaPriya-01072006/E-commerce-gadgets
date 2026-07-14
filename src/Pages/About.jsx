import React from "react";
import {
  Box, Container, Grid, Typography, Card, Avatar, Divider,
} from "@mui/material";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "5K+", label: "Products Listed" },
  { value: "120+", label: "Brand Partners" },
  { value: "4.9★", label: "Average Rating" },
];

const values = [
  { icon: "🎯", title: "Customer First", desc: "Every decision we make starts with one question: what's best for our customer? From UX to delivery, your experience drives us." },
  { icon: "✅", title: "100% Genuine", desc: "We source directly from authorised distributors. Every product comes with the manufacturer's original warranty — no grey-market goods." },
  { icon: "🚀", title: "Speed & Reliability", desc: "Same-day dispatch in metro cities. Real-time tracking so you always know exactly where your order is." },
  { icon: "💬", title: "Always Available", desc: "Our support team works round the clock — 365 days a year — via chat, phone, and email. No bots, just humans." },
  { icon: "🌱", title: "Sustainable Packaging", desc: "We use 100% recyclable packaging and are committed to becoming carbon-neutral by 2027." },
  { icon: "🔒", title: "Secure & Private", desc: "Bank-grade SSL encryption on every transaction. We never sell your data. Ever." },
];

const team = [
  { name: "Rahul Menon", role: "Founder & CEO", avatar: "RM", bio: "Ex-Amazon product lead. 12 years in e-commerce and logistics." },
  { name: "Divya Kapoor", role: "CTO", avatar: "DK", bio: "Full-stack engineer turned tech founder. Obsessed with performance." },
  { name: "Sameer Joshi", role: "Head of Sourcing", avatar: "SJ", bio: "Former Samsung India partnerships manager. Knows every brand inside out." },
  { name: "Ananya Nair", role: "Head of Customer Success", avatar: "AN", bio: "Built MopriX's legendary support culture from the ground up." },
];

const timeline = [
  { year: "2022", event: "MopriX founded in Bangalore with just 12 products and a big dream." },
  { year: "2023", event: "Crossed ₹10 Cr in revenue. Launched express same-day delivery in 8 cities." },
  { year: "2024", event: "Onboarded 100+ brand partners. Reached 25,000 happy customers." },
  { year: "2025", event: "Launched the MopriX mobile app. Expanded to 50+ cities across India." },
  { year: "2026", event: "50,000+ customers, 5,000+ products, and still growing." },
];

export default function About() {
  return (
    <Box>
      {/* Hero */}
      <Box sx={{
        background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 55%,#312e81 100%)",
        py: { xs: 10, md: 16 }, textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 40%, rgba(37,99,235,0.18) 0%, transparent 55%)" }} />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: "primary.light", fontWeight: 700, letterSpacing: 2, display: "block", mb: 2 }}>
            Our Story
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: "#f8fafc", mb: 3, fontSize: { xs: "2.2rem", md: "3.5rem" } }}>
            We're on a mission to make <Box component="span" sx={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>premium tech</Box> accessible to all.
          </Typography>
          <Typography variant="h6" sx={{ color: "#94a3b8", fontWeight: 400, maxWidth: 600, mx: "auto", lineHeight: 1.7 }}>
            Founded in Bangalore in 2022, MopriX was born from a simple frustration: why is buying genuine, top-quality tech in India so hard? We set out to fix that.
          </Typography>
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ bgcolor: "background.paper", py: 8, borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((s) => (
              <Grid item xs={6} md={3} key={s.label} sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "primary.main", mb: 0.5 }}>{s.value}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>{s.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Story */}
      <Box sx={{ bgcolor: "background.default", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 1 }}>Who We Are</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary", mb: 3 }}>Built by tech lovers, for tech lovers.</Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2 }}>
                MopriX started when three friends — frustrated by counterfeit products, terrible delivery, and zero after-sales support — decided to build the store they always wished existed.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2 }}>
                Today we curate thousands of products across smartphones, laptops, audio, and wearables. Every single item is sourced directly from the brand or their authorised distributor — we never compromise on authenticity.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                We believe technology should empower your life, not frustrate it. That's why we obsess over every detail — from packaging to post-sale support — so you can shop with complete confidence.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: "background.paper", borderRadius: 4, overflow: "hidden", border: "1px solid", borderColor: "divider", boxShadow: "0 20px 60px rgba(0,0,0,0.07)" }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="MopriX Team"
                  style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Timeline */}
      <Box sx={{ bgcolor: "background.paper", py: 10, borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 1 }}>Our Journey</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary" }}>From Idea to India's Favourite Gadget Store</Typography>
          </Box>
          <Box sx={{ position: "relative", "&::before": { content: '""', position: "absolute", left: { xs: 16, md: "50%" }, top: 0, bottom: 0, width: 2, bgcolor: "divider", transform: { md: "translateX(-50%)" } } }}>
            {timeline.map((item, idx) => (
              <Box key={item.year} sx={{ display: "flex", flexDirection: { xs: "row", md: idx % 2 === 0 ? "row" : "row-reverse" }, gap: 3, mb: 5, position: "relative" }}>
                <Box sx={{ display: { xs: "none", md: "flex" }, flex: 1, justifyContent: idx % 2 === 0 ? "flex-end" : "flex-start", alignItems: "flex-start", pt: 0.5 }}>
                  {idx % 2 === 0 && (
                    <Card sx={{ maxWidth: 320, p: 2.5 }}>
                      <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 800, mb: 1 }}>{item.year}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>{item.event}</Typography>
                    </Card>
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "center", width: { xs: 40, md: 48 }, flexShrink: 0, position: "relative", zIndex: 1 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: "primary.main", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0, boxShadow: "0 0 0 4px #fff, 0 0 0 6px", boxShadowColor: "primary.light" }}>
                    {item.year.slice(2)}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pt: 0.5 }}>
                  <Card sx={{ maxWidth: 320, p: 2.5, display: { xs: "block", md: idx % 2 === 1 ? "block" : "none" } }}>
                    <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 800, mb: 1 }}>{item.year}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>{item.event}</Typography>
                  </Card>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Core Values */}
      <Box sx={{ bgcolor: "background.default", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 1 }}>What Drives Us</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary" }}>Our Core Values</Typography>
          </Box>
          <Grid container spacing={3}>
            {values.map((v) => (
              <Grid item xs={12} sm={6} md={4} key={v.title}>
                <Card sx={{ p: 3.5, height: "100%", transition: "box-shadow 0.3s, transform 0.3s", "&:hover": { boxShadow: "0 16px 48px rgba(37,99,235,0.1)", transform: "translateY(-4px)" } }}>
                  <Typography sx={{ fontSize: 36, mb: 2 }}>{v.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>{v.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>{v.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team */}
      <Box sx={{ bgcolor: "background.paper", py: 10, borderTop: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 1 }}>The People</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary" }}>Meet Our Team</Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {team.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.name}>
                <Card sx={{ p: 3.5, textAlign: "center", height: "100%", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0 16px 48px rgba(0,0,0,0.09)" } }}>
                  <Avatar sx={{ width: 72, height: 72, mx: "auto", mb: 2.5, background: "linear-gradient(135deg,#2563eb,#7c3aed)", fontSize: 22, fontWeight: 800 }}>
                    {member.avatar}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>{member.name}</Typography>
                  <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 600, display: "block", mb: 1.5 }}>{member.role}</Typography>
                  <Divider sx={{ mb: 1.5 }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>{member.bio}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ background: "linear-gradient(135deg,#1e3a5f,#2563eb)", py: 10, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ fontWeight: 900, color: "#fff", mb: 2 }}>Ready to explore our collection?</Typography>
          <Typography variant="body1" sx={{ color: "#93c5fd", mb: 4 }}>Thousands of genuine products. Delivered fast. Backed by the best support in India.</Typography>
          <Box component="a" href="/shop" sx={{ display: "inline-block", px: 5, py: 1.75, borderRadius: 2.5, bgcolor: "#fff", color: "primary.main", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.2)", transition: "opacity 0.2s", "&:hover": { opacity: 0.9 } }}>
            Shop Now →
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
