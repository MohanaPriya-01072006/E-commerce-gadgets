import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card, CardContent, CardMedia, Typography, Button, Box,
  IconButton, Rating, Chip, Snackbar, Alert, Tooltip,
} from "@mui/material";
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { useCart } from "../Context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const discount = product.original ? Math.round((1 - product.price / product.original) * 100) : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setSnackOpen(true);
  };

  const badgeColors = {
    SALE: { bgcolor: "error.main", color: "#fff" },
    NEW: { bgcolor: "success.main", color: "#fff" },
    HOT: { bgcolor: "warning.main", color: "#fff" },
  };

  return (
    <>
      <Card sx={{
        height: "100%", display: "flex", flexDirection: "column", position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": { transform: "translateY(-6px)", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" },
      }}>
        {/* Badges */}
        <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 2, display: "flex", flexDirection: "column", gap: 0.75 }}>
          {product.badge && (
            <Chip label={product.badge} size="small" sx={{ fontWeight: 800, fontSize: 10, height: 22, ...(badgeColors[product.badge] || { bgcolor: "grey.500", color: "#fff" }) }} />
          )}
          {discount && (
            <Chip label={`-${discount}%`} size="small" sx={{ fontWeight: 800, fontSize: 10, height: 22, bgcolor: "error.light", color: "error.dark" }} />
          )}
        </Box>

        {/* Wishlist */}
        <Tooltip title={wished ? "Remove from wishlist" : "Save to wishlist"}>
          <IconButton
            size="small"
            onClick={(e) => { e.preventDefault(); setWished(!wished); }}
            sx={{
              position: "absolute", top: 10, right: 10, zIndex: 2,
              bgcolor: wished ? "error.light" : "rgba(255,255,255,0.85)",
              color: wished ? "error.main" : "text.secondary",
              "&:hover": { bgcolor: wished ? "error.light" : "rgba(255,255,255,0.95)" },
              backdropFilter: "blur(4px)",
            }}
          >
            {wished ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* Image */}
        <Box component={RouterLink} to={`/product/${product.id}`} sx={{ display: "block", overflow: "hidden", bgcolor: "grey.50", "& img": { transition: "transform 0.5s ease" }, "&:hover img": { transform: "scale(1.06)" } }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ height: 220, objectFit: "cover", display: "block", width: "100%" }}
          />
        </Box>

        {/* Content */}
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.75, p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, lineHeight: 1.2 }}>{product.category}</Typography>
          <Typography
            variant="subtitle1"
            component={RouterLink}
            to={`/product/${product.id}`}
            sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.35, textDecoration: "none", "&:hover": { color: "primary.main" }, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>({product.reviews.toLocaleString()})</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "text.primary" }}>₹{product.price.toLocaleString()}</Typography>
            {product.original && (
              <Typography variant="body2" sx={{ color: "text.disabled", textDecoration: "line-through" }}>₹{product.original.toLocaleString()}</Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: "auto", pt: 1.5 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ fontWeight: 700, py: 1.1 }}
            >
              Add to Cart
            </Button>
            <Button
              component={RouterLink}
              to={`/product/${product.id}`}
              variant="outlined"
              sx={{ minWidth: 44, px: 0, py: 1.1, fontWeight: 700 }}
              title="View details"
            >
              ···
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" variant="filled" sx={{ borderRadius: 2, fontWeight: 600 }}>
          Added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}
