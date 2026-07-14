import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box, Container, Grid, Typography, Button, Card, CardContent,
  Checkbox, FormControlLabel, FormGroup, Divider, Slider,
  MenuItem, Select, InputLabel, FormControl, Chip, IconButton,
  Drawer, useMediaQuery, useTheme, Badge, Collapse,
} from "@mui/material";
import { FilterList, Close, ExpandMore, ExpandLess, GridView, ViewList } from "@mui/icons-material";
import { products } from "../Data/products";
import ProductCard from "../Components/ProductCard";

const CATEGORIES = ["Smartphones", "Laptops", "Wearables", "Audio", "Tablets", "Cameras", "Gaming"];
const BRANDS = ["Samsung", "Apple", "Sony", "OnePlus", "Xiaomi", "Dell", "Bose", "JBL"];
const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "newest", label: "Newest First" },
];
const MAX_PRICE = 120000;

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", py: 1.25, "&:hover": { color: "primary.main" } }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>{title}</Typography>
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </Box>
      <Divider sx={{ mb: 1.5 }} />
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
}

function FiltersPanel({ categories, brands, priceRange, onCategory, onBrand, onPrice, onClear, activeCount }) {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Filters {activeCount > 0 && <Chip label={activeCount} color="primary" size="small" sx={{ ml: 1, fontWeight: 700 }} />}
        </Typography>
        {activeCount > 0 && (
          <Button size="small" color="error" onClick={onClear} sx={{ fontWeight: 600, fontSize: 12 }}>Clear all</Button>
        )}
      </Box>

      <FilterSection title="Category">
        <FormGroup>
          {CATEGORIES.map((cat) => (
            <FormControlLabel
              key={cat}
              control={<Checkbox checked={categories.includes(cat)} onChange={() => onCategory(cat)} size="small" color="primary" />}
              label={<Typography variant="body2" sx={{ fontWeight: categories.includes(cat) ? 700 : 400 }}>{cat}</Typography>}
              sx={{ mb: 0.25 }}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection title="Brand">
        <FormGroup>
          {BRANDS.map((brand) => (
            <FormControlLabel
              key={brand}
              control={<Checkbox checked={brands.includes(brand)} onChange={() => onBrand(brand)} size="small" color="primary" />}
              label={<Typography variant="body2">{brand}</Typography>}
              sx={{ mb: 0.25 }}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection title="Price Range">
        <Box sx={{ px: 1, pt: 1 }}>
          <Slider
            value={priceRange}
            onChange={(_, v) => onPrice(v)}
            min={0} max={MAX_PRICE} step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `₹${(v / 1000).toFixed(0)}K`}
            color="primary"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>₹{priceRange[0].toLocaleString()}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>₹{priceRange[1].toLocaleString()}</Typography>
          </Box>
        </Box>
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        <FormGroup>
          {["In Stock", "On Sale", "New Arrivals"].map((opt) => (
            <FormControlLabel key={opt} control={<Checkbox size="small" color="primary" />} label={<Typography variant="body2">{opt}</Typography>} sx={{ mb: 0.25 }} />
          ))}
        </FormGroup>
      </FilterSection>
    </Box>
  );
}

export default function Shop() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
  const requestedCategory = searchParams.get("category") || "";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(() => CATEGORIES.includes(requestedCategory) ? [requestedCategory] : []);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [sort, setSort] = useState("default");
  const [gridCols, setGridCols] = useState(3);

  const toggleCategory = (cat) => setSelectedCategories((p) => p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat]);
  const toggleBrand = (b) => setSelectedBrands((p) => p.includes(b) ? p.filter((x) => x !== b) : [...p, b]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, MAX_PRICE]);
  };

  const activeFilterCount = selectedCategories.length + selectedBrands.length + (priceRange[0] > 0 || priceRange[1] < MAX_PRICE ? 1 : 0);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catOk = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const priceOk = p.price >= priceRange[0] && p.price <= priceRange[1];
      const brandOk = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const searchOk = !searchQuery || [p.name, p.category, p.brand, p.description, ...(p.specs || [])]
        .join(" ").toLowerCase().includes(searchQuery);
      return catOk && priceOk && brandOk && searchOk;
    });
    switch (sort) {
      case "price_asc": return [...list].sort((a, b) => a.price - b.price);
      case "price_desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      case "reviews": return [...list].sort((a, b) => b.reviews - a.reviews);
      case "newest": return [...list].reverse();
      default: return list;
    }
  }, [selectedCategories, selectedBrands, priceRange, sort, searchQuery]);

  const filtersPanel = (
    <FiltersPanel
      categories={selectedCategories}
      brands={selectedBrands}
      priceRange={priceRange}
      onCategory={toggleCategory}
      onBrand={toggleBrand}
      onPrice={setPriceRange}
      onClear={clearAll}
      activeCount={activeFilterCount}
    />
  );

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 6 } }}>
      {/* Page Header */}
      <Box sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider", py: 5, mb: 5, textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 1 }}>All Products</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, color: "text.primary", mb: 1.5 }}>Shop Gadgets</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 500, mx: "auto" }}>
            {searchQuery ? `Results for “${searchParams.get("q")}”` : `Discover ${products.length}+ premium gadgets — curated, genuine, and delivered fast.`}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Active filter chips */}
        {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3, alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>Active:</Typography>
            {selectedCategories.map((c) => (
              <Chip key={c} label={c} onDelete={() => toggleCategory(c)} color="primary" variant="outlined" size="small" sx={{ fontWeight: 600 }} />
            ))}
            {selectedBrands.map((b) => (
              <Chip key={b} label={b} onDelete={() => toggleBrand(b)} color="secondary" variant="outlined" size="small" sx={{ fontWeight: 600 }} />
            ))}
            <Button size="small" color="error" onClick={clearAll} sx={{ fontSize: 12, fontWeight: 600 }}>Clear all</Button>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Grid item md={3} lg={2.5}>
              <Card sx={{ p: 2.5, position: "sticky", top: 90 }}>
                {filtersPanel}
              </Card>
            </Grid>
          )}

          {/* Products Area */}
          <Grid item xs={12} md={9} lg={9.5}>
            {/* Toolbar */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {isMobile && (
                  <Button
                    startIcon={<Badge badgeContent={activeFilterCount || undefined} color="primary"><FilterList /></Badge>}
                    variant="outlined" onClick={() => setDrawerOpen(true)} sx={{ fontWeight: 600 }}
                  >
                    Filters
                  </Button>
                )}
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                  Showing <Box component="span" sx={{ fontWeight: 800, color: "text.primary" }}>{filtered.length}</Box> of {products.length} products
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <IconButton size="small" onClick={() => setGridCols(3)} sx={{ color: gridCols === 3 ? "primary.main" : "text.disabled" }}><GridView /></IconButton>
                <IconButton size="small" onClick={() => setGridCols(2)} sx={{ color: gridCols === 2 ? "primary.main" : "text.disabled" }}><ViewList /></IconButton>
                <FormControl size="small" sx={{ minWidth: 165 }}>
                  <InputLabel sx={{ fontWeight: 600 }}>Sort by</InputLabel>
                  <Select value={sort} label="Sort by" onChange={(e) => setSort(e.target.value)} sx={{ borderRadius: 2, fontWeight: 600 }}>
                    {SORT_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value} sx={{ fontWeight: 500 }}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {filtered.length === 0 ? (
              <Card sx={{ textAlign: "center", py: 10 }}>
                <Typography sx={{ fontSize: 52, mb: 2 }}>🔍</Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>No products found</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>Try adjusting your filters to see more results.</Typography>
                <Button variant="contained" onClick={clearAll}>Clear Filters</Button>
              </Card>
            ) : (
              <Grid container spacing={2.5}>
                {filtered.map((p) => (
                  <Grid item xs={12} sm={6} md={gridCols === 2 ? 6 : 4} key={p.id}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 300, p: 3 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Filters</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
        </Box>
        {filtersPanel}
        <Button variant="contained" fullWidth onClick={() => setDrawerOpen(false)} sx={{ mt: 2, py: 1.5, fontWeight: 700 }}>
          Show {filtered.length} Results
        </Button>
      </Drawer>
    </Box>
  );
}
