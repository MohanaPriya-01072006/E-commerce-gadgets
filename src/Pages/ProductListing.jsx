import React, { useState } from 'react';
import { 
  Box, Container, Grid, Typography, Card, CardMedia, CardContent, 
  Button, Rating, Checkbox, FormGroup, FormControlLabel, Slider, 
  Divider, Drawer, IconButton, useMediaQuery, useTheme 
} from '@mui/material';
import { FilterList as FilterIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import Footer from '../Components/Footer';

// Dummy Data
const allProducts = [
  { id: 1, name: "SoundPro X Wireless Earbuds", category: "Audio", price: 4999, original: 7999, rating: 4.8, reviews: 2341, badge: "SALE", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { id: 2, name: "Nova X Pro Smartphone", category: "Smartphones", price: 64999, rating: 4.9, reviews: 1892, badge: "HOT", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
  { id: 3, name: "FitTrack Smartwatch 7", category: "Wearables", price: 12499, original: 15999, rating: 4.7, reviews: 987, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { id: 4, name: "UltraBook X1 Carbon", category: "Laptops", price: 115000, rating: 4.9, reviews: 534, badge: "NEW", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },
  { id: 5, name: "ProTab 12 Ultra", category: "Tablets", price: 54999, original: 64999, rating: 4.6, reviews: 765, badge: "SALE", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
  { id: 6, name: "StudioBoom Speaker", category: "Audio", price: 8999, rating: 4.7, reviews: 1230, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
  { id: 7, name: "HyperCam 4K Drone", category: "Cameras", price: 39999, rating: 4.5, reviews: 421, badge: "NEW", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80" },
  { id: 8, name: "GamePad Pro Elite", category: "Gaming", price: 5999, original: 8999, rating: 4.8, reviews: 3200, badge: "SALE", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
];

const categories = ["All", "Smartphones", "Audio", "Laptops", "Wearables", "Tablets", "Cameras", "Gaming"];

export default function ProductListing() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { addToCart } = useCart();

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = allProducts.filter(p => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const FilterSidebar = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Filters</Typography>
      
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary', textTransform: 'uppercase' }}>Categories</Typography>
      <FormGroup sx={{ mb: 3 }}>
        {categories.map(cat => (
          <FormControlLabel 
            key={cat}
            control={
              <Checkbox 
                checked={selectedCategory === cat} 
                onChange={() => setSelectedCategory(cat)} 
                size="small"
              />
            } 
            label={<Typography variant="body2">{cat}</Typography>} 
          />
        ))}
      </FormGroup>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 3, color: 'text.secondary', textTransform: 'uppercase' }}>Price Range (₹)</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={150000}
        step={5000}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
        <Typography variant="body2">₹{priceRange[0].toLocaleString()}</Typography>
        <Typography variant="body2">₹{priceRange[1].toLocaleString()}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 4 }}>
      <Container maxWidth="lg">
        
        {/* Header Area */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>All Products</Typography>
          {isMobile && (
            <Button variant="outlined" startIcon={<FilterIcon />} onClick={() => setMobileFilterOpen(true)}>
              Filters
            </Button>
          )}
        </Box>

        <Grid container spacing={4}>
          {/* Sidebar */}
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Card sx={{ position: 'sticky', top: 100, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <FilterSidebar />
              </Card>
            </Grid>
          )}

          {/* Product Grid */}
          <Grid item xs={12} md={9}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Showing {filteredProducts.length} results
            </Typography>
            
            <Grid container spacing={3}>
              {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ position: 'relative', pt: '100%', bgcolor: '#f8fafc' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, lineHeight: 1 }}>{product.category}</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{product.name}</Typography>
                      
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Rating value={product.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>({product.reviews.toLocaleString()})</Typography>
                      </Box>
                      
                      <Box sx={{ mt: 1, mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", display: 'inline-block', mr: 1 }}>₹{product.price.toLocaleString()}</Typography>
                        {product.original && <Typography variant="body2" sx={{ color: "text.secondary", textDecoration: "line-through", display: 'inline-block' }}>₹{product.original.toLocaleString()}</Typography>}
                      </Box>
                      
                      <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                        <Button 
                          variant="contained" 
                          fullWidth 
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          component={RouterLink} 
                          to={`/products/${product.id}`}
                          variant="outlined"
                          sx={{ minWidth: '40px', px: 0 }}
                        >
                          ...
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      
      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 280 } }}
      >
        <FilterSidebar />
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Button variant="contained" fullWidth onClick={() => setMobileFilterOpen(false)}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
      
      <Box sx={{ mt: 8 }}><Footer /></Box>
    </Box>
  );
}
