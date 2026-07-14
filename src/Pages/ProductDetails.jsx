import React, { useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box, Container, Grid, Typography, Button, Card, CardContent,
  Tabs, Tab, Rating, Chip, Divider, IconButton, Avatar, Alert,
  Snackbar, Breadcrumbs, Tooltip,
} from "@mui/material";
import {
  Add, Remove, ShoppingCart, Favorite, FavoriteBorder,
  Share, LocalShipping, VerifiedUser, Replay, NavigateNext,
} from "@mui/icons-material";
import { useCart } from "../Context/CartContext";
import { products } from "../Data/products";
import ProductCard from "../Components/ProductCard";

const reviews = [
  { name: "Arjun M.", city: "Mumbai", rating: 5, date: "Dec 2025", text: "Absolutely brilliant product. Exceeded my expectations in every way. Fast delivery too!", avatar: "AM" },
  { name: "Priya S.", city: "Delhi", rating: 5, date: "Nov 2025", text: "Quality is top-notch. Works exactly as described. MopriX packaging was immaculate.", avatar: "PS" },
  { name: "Ravi K.", city: "Bengaluru", rating: 4, date: "Oct 2025", text: "Great product, minor setup issue but support team resolved it in minutes. Very happy.", avatar: "RK" },
  { name: "Sneha P.", city: "Pune", rating: 5, date: "Sep 2025", text: "Gifted this to my partner — the unboxing experience alone was worth it. Premium feel.", avatar: "SP" },
];

const ratingDist = { 5: 68, 4: 18, 3: 8, 2: 4, 1: 2 };

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(0);
  const [wished, setWished] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));
  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", py: 16 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Product Not Found</Typography>
        <Button component={RouterLink} to="/shop" variant="contained">Back to Shop</Button>
      </Box>
    );
  }

  const discount = product.original ? Math.round((1 - product.price / product.original) * 100) : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setSnackOpen(true);
  };
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    navigate("/cart");
  };

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Breadcrumb */}
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4 }}>
          {[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: product.category, to: "/shop" }].map((b) => (
            <Box key={b.label} component={RouterLink} to={b.to} sx={{ color: "text.secondary", textDecoration: "none", fontSize: 14, "&:hover": { color: "primary.main" } }}>{b.label}</Box>
          ))}
          <Typography sx={{ fontSize: 14, color: "text.primary", fontWeight: 600 }}>{product.name}</Typography>
        </Breadcrumbs>

        {/* Main Product Area */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          {/* Image */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", border: "1.5px solid", borderColor: "divider", bgcolor: "grey.50", aspectRatio: "1", "&:hover img": { transform: "scale(1.05)" }, "& img": { transition: "transform 0.5s ease" } }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {product.badge && (
                <Chip label={product.badge} size="small" sx={{ position: "absolute", top: 16, left: 16, fontWeight: 800, bgcolor: product.badge === "SALE" ? "error.main" : product.badge === "NEW" ? "success.main" : "warning.main", color: "#fff" }} />
              )}
              {discount && (
                <Chip label={`-${discount}%`} size="small" sx={{ position: "absolute", top: product.badge ? 52 : 16, left: 16, fontWeight: 800, bgcolor: "error.light", color: "error.dark" }} />
              )}
              <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 1 }}>
                <Tooltip title={wished ? "Remove from wishlist" : "Add to wishlist"}>
                  <IconButton onClick={() => setWished(!wished)} sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: wished ? "error.light" : "grey.100" }, color: wished ? "error.main" : "text.secondary" }}>
                    {wished ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: "grey.100" }, color: "text.secondary" }}>
                    <Share />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>

          {/* Info */}
          <Grid item xs={12} md={7}>
            <Chip label={product.category} color="primary" variant="outlined" size="small" sx={{ fontWeight: 700, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 900, color: "text.primary", mb: 2, lineHeight: 1.2, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
              {product.name}
            </Typography>

            {/* Rating row */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Rating value={product.rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.rating}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>({product.reviews.toLocaleString()} reviews)</Typography>
              <Chip label="In Stock" size="small" color="success" variant="outlined" sx={{ ml: 1, fontWeight: 700 }} />
            </Box>

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "text.primary" }}>₹{product.price.toLocaleString()}</Typography>
              {product.original && <Typography variant="h6" sx={{ color: "text.disabled", textDecoration: "line-through", fontWeight: 400 }}>₹{product.original.toLocaleString()}</Typography>}
              {discount && <Chip label={`Save ${discount}%`} color="error" size="small" sx={{ fontWeight: 700 }} />}
            </Box>

            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}>
              {product.description}
            </Typography>

            {/* Qty + Cart */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", border: "1.5px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
                <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ borderRadius: 0, px: 1.5 }}><Remove /></IconButton>
                <Typography sx={{ px: 2.5, fontWeight: 700, minWidth: 40, textAlign: "center", fontSize: "1.1rem" }}>{quantity}</Typography>
                <IconButton size="small" onClick={() => setQuantity(quantity + 1)} sx={{ borderRadius: 0, px: 1.5 }}><Add /></IconButton>
              </Box>
              <Button variant="contained" size="large" startIcon={<ShoppingCart />} onClick={handleAddToCart} sx={{ px: 4, py: 1.5, fontWeight: 700, flex: 1, minWidth: 160 }}>
                Add to Cart
              </Button>
              <Button variant="outlined" size="large" onClick={handleBuyNow} sx={{ px: 4, py: 1.5, fontWeight: 700, flex: 1, minWidth: 140 }}>
                Buy Now
              </Button>
            </Box>

            {/* Delivery info cards */}
            <Grid container spacing={2}>
              {[
                { icon: <LocalShipping color="primary" />, title: "Free Delivery", desc: "On orders over ₹10,000" },
                { icon: <VerifiedUser color="success" />, title: "2 Year Warranty", desc: "Manufacturer backed" },
                { icon: <Replay color="warning" />, title: "15-Day Returns", desc: "No questions asked" },
              ].map((f) => (
                <Grid item xs={12} sm={4} key={f.title}>
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", p: 1.5, bgcolor: "background.paper", borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
                    {f.icon}
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, display: "block", color: "text.primary" }}>{f.title}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>{f.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Tabs: Description / Specs / Reviews */}
        <Card sx={{ mb: 8 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: "1px solid", borderColor: "divider", px: 2 }} textColor="primary" indicatorColor="primary">
            <Tab label="Description" sx={{ fontWeight: 600, minWidth: 120 }} />
            <Tab label="Specifications" sx={{ fontWeight: 600, minWidth: 120 }} />
            <Tab label={`Reviews (${reviews.length})`} sx={{ fontWeight: 600, minWidth: 140 }} />
          </Tabs>

          <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
            {tab === 0 && (
              <Box>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, mb: 2 }}>
                  Experience the next level of technology with the <strong>{product.name}</strong>. Carefully engineered to provide the best performance in its class, this device sets a new standard for what you expect from premium gadgets.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                  Whether you're a professional looking to boost your productivity or an enthusiast who appreciates beautiful design and powerful hardware, the {product.name} is built for you. Every component is precision-crafted and quality-tested before reaching you.
                </Typography>
              </Box>
            )}
            {tab === 1 && (
              <Box>
                <Grid container spacing={2}>
                  {product.specs.map((spec, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", p: 2, bgcolor: "background.default", borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>{spec}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {tab === 2 && (
              <Box>
                {/* Summary */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: "primary.main" }}>{product.rating}</Typography>
                    <Rating value={product.rating} precision={0.1} readOnly size="large" sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>{product.reviews.toLocaleString()} verified reviews</Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    {Object.entries(ratingDist).reverse().map(([star, pct]) => (
                      <Box key={star} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 32, fontWeight: 600 }}>{star} ★</Typography>
                        <Box sx={{ flex: 1, height: 8, bgcolor: "grey.200", borderRadius: 4, overflow: "hidden" }}>
                          <Box sx={{ height: "100%", width: `${pct}%`, bgcolor: "warning.main", borderRadius: 4 }} />
                        </Box>
                        <Typography variant="caption" sx={{ minWidth: 32, color: "text.secondary" }}>{pct}%</Typography>
                      </Box>
                    ))}
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  {reviews.map((r) => (
                    <Grid item xs={12} md={6} key={r.name}>
                      <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                            <Avatar sx={{ width: 38, height: 38, background: "linear-gradient(135deg,#2563eb,#7c3aed)", fontSize: 13, fontWeight: 700 }}>{r.avatar}</Avatar>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{r.name}</Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>{r.city} · {r.date}</Typography>
                            </Box>
                          </Box>
                          <Chip label="Verified" color="success" size="small" variant="outlined" sx={{ fontWeight: 700, fontSize: 11 }} />
                        </Box>
                        <Rating value={r.rating} size="small" readOnly sx={{ mb: 1 }} />
                        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, fontStyle: "italic" }}>"{r.text}"</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Related Products */}
        {related.length > 0 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>More from {product.category}</Typography>
              <Button component={RouterLink} to="/shop" sx={{ fontWeight: 600 }}>View All →</Button>
            </Box>
            <Grid container spacing={3}>
              {related.map((p) => (
                <Grid item xs={12} sm={6} md={3} key={p.id}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      <Snackbar open={snackOpen} autoHideDuration={2500} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" variant="filled" sx={{ borderRadius: 2, fontWeight: 600 }}>
          ✅ Added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
}
