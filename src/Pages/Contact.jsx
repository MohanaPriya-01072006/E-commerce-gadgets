import React, { useState } from "react";
import {
  Box, Container, Grid, Typography, Card, CardContent,
  TextField, Button, Alert, Snackbar, Divider,
} from "@mui/material";
import {
  LocationOn, Phone, Email, AccessTime, Send, CheckCircle,
} from "@mui/icons-material";

const contactCards = [
  { icon: <LocationOn sx={{ fontSize: 28 }} />, title: "Visit Us", lines: ["MopriX Headquarters", "MG Road, Indiranagar", "Bangalore, Karnataka 560001"] },
  { icon: <Phone sx={{ fontSize: 28 }} />, title: "Call Us", lines: ["+91 98765 43210", "+91 80 1234 5678", "Toll-free: 1800-123-4567"] },
  { icon: <Email sx={{ fontSize: 28 }} />, title: "Email Us", lines: ["support@moprix.in", "business@moprix.in", "We reply within 2 hours"] },
  { icon: <AccessTime sx={{ fontSize: 28 }} />, title: "Working Hours", lines: ["Mon – Fri: 9 AM – 8 PM", "Sat: 10 AM – 6 PM", "Sun: Closed"] },
];

const topics = ["Order Issue", "Product Enquiry", "Return / Refund", "Technical Support", "Partnership", "Other"];

function validate(form) {
  const e = {};
  if (!form.name.trim()) e.name = "Name is required";
  if (!form.email.trim()) e.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
  if (!form.subject) e.subject = "Please select a topic";
  if (!form.message.trim()) e.message = "Message is required";
  else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1600);
  };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", py: { xs: 8, md: 12 }, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: "primary.light", fontWeight: 700, letterSpacing: 2, display: "block", mb: 2 }}>Get In Touch</Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: "#f8fafc", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}>
            We're Here to Help
          </Typography>
          <Typography variant="h6" sx={{ color: "#94a3b8", fontWeight: 400, maxWidth: 520, mx: "auto" }}>
            Our support team is available 6 days a week. Reach out — we typically respond within 2 hours.
          </Typography>
        </Container>
      </Box>

      {/* Contact Cards */}
      <Box sx={{ bgcolor: "background.paper", py: 7, borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {contactCards.map((c) => (
              <Grid item xs={12} sm={6} md={3} key={c.title}>
                <Card sx={{ height: "100%", textAlign: "center", p: 1.5, transition: "box-shadow 0.3s, transform 0.3s", "&:hover": { boxShadow: "0 16px 48px rgba(37,99,235,0.1)", transform: "translateY(-4px)" } }}>
                  <CardContent>
                    <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: "primary.light", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2.5 }}>
                      {c.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>{c.title}</Typography>
                    {c.lines.map((line, i) => (
                      <Typography key={i} variant="body2" sx={{ color: i === 0 ? "text.primary" : "text.secondary", fontWeight: i === 0 ? 600 : 400, lineHeight: 1.8 }}>
                        {line}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Form + Map */}
      <Box sx={{ bgcolor: "background.default", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Form */}
            <Grid item xs={12} md={7}>
              <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 1 }}>Send a Message</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 4 }}>How Can We Help You?</Typography>

              {success ? (
                <Card sx={{ p: 5, textAlign: "center", border: "2px solid", borderColor: "success.main" }}>
                  <CheckCircle sx={{ fontSize: 64, color: "success.main", mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>Message Sent!</Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7 }}>
                    Thanks for reaching out. Our team will get back to you within 2 business hours.
                  </Typography>
                  <Button variant="contained" onClick={() => setSuccess(false)}>Send Another Message</Button>
                </Card>
              ) : (
                <Card component="form" onSubmit={handleSubmit} noValidate>
                  <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Full Name" fullWidth required value={form.name} onChange={handleChange("name")} error={!!errors.name} helperText={errors.name} sx={fieldSx} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Email Address" fullWidth required type="email" value={form.email} onChange={handleChange("email")} error={!!errors.email} helperText={errors.email} sx={fieldSx} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Phone (optional)" fullWidth type="tel" value={form.phone} onChange={handleChange("phone")} sx={fieldSx} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Topic" fullWidth required select value={form.subject} onChange={handleChange("subject")} error={!!errors.subject} helperText={errors.subject} sx={fieldSx}>
                          <option value="" disabled hidden>Select a topic</option>
                          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message" fullWidth required multiline rows={5}
                          value={form.message} onChange={handleChange("message")}
                          error={!!errors.message} helperText={errors.message || `${form.message.length}/500`}
                          inputProps={{ maxLength: 500 }}
                          sx={fieldSx}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit" variant="contained" size="large" fullWidth
                          endIcon={<Send />} disabled={submitting}
                          sx={{ py: 1.75, fontWeight: 800, fontSize: "1rem" }}
                        >
                          {submitting ? "Sending…" : "Send Message"}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Info sidebar */}
            <Grid item xs={12} md={5}>
              <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 1 }}>Find Us</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mb: 3 }}>Our Location</Typography>

              {/* Map placeholder */}
              <Box sx={{ borderRadius: 3, overflow: "hidden", height: 260, bgcolor: "grey.100", border: "1px solid", borderColor: "divider", mb: 4, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
                <LocationOn sx={{ fontSize: 48, color: "primary.main" }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.secondary" }}>MG Road, Bangalore</Typography>
                <Button variant="outlined" size="small" href="https://maps.google.com" target="_blank" rel="noreferrer">Open in Google Maps</Button>
              </Box>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5 }}>Quick Response Channels</Typography>
                  {[
                    { icon: "💬", label: "Live Chat", desc: "Available Mon–Sat, 9 AM–8 PM", action: "Start Chat" },
                    { icon: "📧", label: "Email Support", desc: "Reply within 2 hours", action: "Email Us" },
                    { icon: "📞", label: "Phone Support", desc: "+91 98765 43210", action: "Call Now" },
                  ].map((ch, i) => (
                    <Box key={ch.label}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5 }}>
                        <Typography sx={{ fontSize: 22 }}>{ch.icon}</Typography>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{ch.label}</Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>{ch.desc}</Typography>
                        </Box>
                        <Button size="small" variant="outlined" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>{ch.action}</Button>
                      </Box>
                      {i < 2 && <Divider />}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
