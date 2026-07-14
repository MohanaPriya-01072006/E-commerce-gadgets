import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Badge, Box, Button, Container, Drawer, IconButton, InputBase, Stack, Toolbar, Typography } from '@mui/material';
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { useCart } from '../Context/CartContext';

const categories = ['Popular', 'Phones', 'Laptops', 'Audio', 'Smartwatches', 'Gaming', 'Cameras', 'Accessories', 'Home Tech', 'Offers'];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const submitSearch = (event) => { event.preventDefault(); navigate(search.trim() ? `/shop?q=${encodeURIComponent(search.trim())}` : '/shop'); };
  return <>
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#fff', color: '#172033', borderBottom: '1px solid #e6e5ea' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1480 }}><Toolbar disableGutters sx={{ minHeight: { xs: 66, md: 82 }, gap: { xs: 1, md: 3 } }}>
        <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#3e0b55', mr: { md: 1 } }}><Typography sx={{ fontSize: { xs: 28, md: 39 }, fontWeight: 800, letterSpacing: '-.075em' }}>moprix</Typography></Box>
        <Box component="form" onSubmit={submitSearch} sx={{ display: { xs: 'none', sm: 'flex' }, flex: 1, maxWidth: 660, alignItems: 'center', border: '1px solid #aaa9b9', borderRadius: 1, height: 49, px: 1.5 }}><FiSearch size={22} color="#69677d" /><InputBase value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search phones, earbuds, laptops or product code" sx={{ ml: 1.3, flex: 1, fontSize: 15 }} /></Box>
        <Stack direction="row" alignItems="center" divider={<Box sx={{ width: '1px', height: 42, bgcolor: '#dddce5' }} />} spacing={{ xs: .4, md: 2.2 }} sx={{ ml: 'auto' }}>
          <Button component={RouterLink} to="/enquiry" sx={{ display: { xs: 'none', lg: 'inline-flex' }, color: '#172033', whiteSpace: 'nowrap' }}>Become a Supplier</Button>
          <Button component={RouterLink} to="/login" sx={{ display: { xs: 'none', lg: 'inline-flex' }, color: '#172033', whiteSpace: 'nowrap' }}>Login</Button>
          <Button component={RouterLink} to="/signup" sx={{ display: { xs: 'none', lg: 'inline-flex' }, color: '#172033', whiteSpace: 'nowrap' }}>Sign Up</Button>
          <Button component={RouterLink} to="/enquiry" sx={{ display: { xs: 'none', lg: 'inline-flex' }, color: '#172033', whiteSpace: 'nowrap' }}>Enquiry</Button>
          <Button component={RouterLink} to="/login" startIcon={<FiUser />} sx={{ color: '#172033', minWidth: 0, px: { xs: .5, md: 1 } }}><Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>Profile</Box></Button>
          <Button component={RouterLink} to="/cart" startIcon={<Badge badgeContent={cartCount} color="secondary"><FiShoppingCart size={20} /></Badge>} sx={{ color: '#172033', minWidth: 0, px: { xs: .5, md: 1 } }}><Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>Cart</Box></Button>
        </Stack>
        <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'inline-flex', lg: 'none' }, ml: .5 }}><FiMenu /></IconButton>
      </Toolbar></Container>
      <Box sx={{ display: { xs: 'none', md: 'block' }, borderTop: '1px solid #edecf0', borderBottom: '1px solid #e6e5ea', overflowX: 'auto' }}><Container maxWidth={false} sx={{ maxWidth: 1480, display: 'flex', minWidth: 'max-content', justifyContent: 'space-between' }}>{categories.map((item) => <Button key={item} component={RouterLink} to="/shop" sx={{ color: '#172033', fontSize: 14, fontWeight: 500, py: 1.65, px: 1.15, whiteSpace: 'nowrap', '&:hover': { color: '#8e176f', bgcolor: 'transparent' } }}>{item}</Button>)}</Container></Box>
    </AppBar>
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: 300, p: 2.5 } }}><Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}><Typography sx={{ color: '#3e0b55', fontWeight: 800, fontSize: 26 }}>moprix</Typography><IconButton onClick={() => setDrawerOpen(false)}><FiX /></IconButton></Stack><Box component="form" onSubmit={submitSearch} sx={{ display: 'flex', alignItems: 'center', border: '1px solid #c9c7d0', borderRadius: 1, p: 1, mb: 2.5 }}><FiSearch /><InputBase value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search gadgets" sx={{ ml: 1, flex: 1 }} /></Box><Stack spacing={.8}>{categories.map((item) => <Button component={RouterLink} to="/shop" onClick={() => setDrawerOpen(false)} key={item} sx={{ justifyContent: 'flex-start', color: '#172033' }}>{item}</Button>)}<Box sx={{ borderTop: '1px solid #e6e5ea', my: 1 }} /><Button component={RouterLink} to="/login" variant="outlined">Login</Button><Button component={RouterLink} to="/signup" variant="outlined">Sign Up</Button><Button component={RouterLink} to="/enquiry" variant="contained" sx={{ bgcolor: '#8e176f' }}>Enquiry</Button></Stack></Drawer>
  </>;
}
