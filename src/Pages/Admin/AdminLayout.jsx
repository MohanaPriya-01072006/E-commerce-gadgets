import React from 'react';
import { Routes, Route, Link as RouterLink, useLocation, Navigate } from 'react-router-dom';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, useMediaQuery, useTheme, IconButton, Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft,
} from '@mui/icons-material';
import { useAuth } from '../../Context/AuthContext';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Products', icon: <ProductsIcon />, path: '/admin/products' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders' },
];

export default function AdminLayout() {
  const { user, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  if (!isAdmin) return <Navigate to="/" replace />;

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a' }}>
      {/* Logo */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 38, height: 38, borderRadius: 2, background: 'linear-gradient(135deg, #8e176f, #c026d3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 16 }}>MX</Box>
          <Box>
            <Typography sx={{ fontWeight: 800, color: '#fff', fontSize: 18, lineHeight: 1.1 }}>MopriX</Typography>
            <Typography sx={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}>ADMIN PANEL</Typography>
          </Box>
        </Box>
        {isMobile && <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#94a3b8' }}><ChevronLeft /></IconButton>}
      </Box>
      <Divider sx={{ borderColor: '#1e293b' }} />

      {/* Menu */}
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <ListItemButton
              key={item.text}
              component={RouterLink}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1.2,
                bgcolor: isActive ? 'rgba(142, 23, 111, 0.2)' : 'transparent',
                color: isActive ? '#e879f9' : '#94a3b8',
                '&:hover': { bgcolor: isActive ? 'rgba(142, 23, 111, 0.25)' : 'rgba(255,255,255,0.05)', color: '#fff' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: 14 }} />
            </ListItemButton>
          );
        })}
      </List>

      {/* User */}
      <Box sx={{ p: 2, borderTop: '1px solid #1e293b' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#8e176f', fontSize: 14, fontWeight: 700 }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </Avatar>
          <Box>
            <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{user?.name}</Typography>
            <Typography sx={{ color: '#64748b', fontSize: 11 }}>{user?.email}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f1f5f9' }}>
      {/* Mobile hamburger */}
      {isMobile && (
        <IconButton onClick={() => setMobileOpen(true)} sx={{ position: 'fixed', top: 80, left: 12, zIndex: 1201, bgcolor: '#0f172a', color: '#fff', '&:hover': { bgcolor: '#1e293b' } }}>
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      {isMobile ? (
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: drawerWidth, border: 'none' } }}>
          {drawer}
        </Drawer>
      ) : (
        <Drawer variant="permanent"
          sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, border: 'none', position: 'relative' } }}>
          {drawer}
        </Drawer>
      )}

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, minWidth: 0, mt: { xs: 6, md: 0 } }}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Routes>
      </Box>
    </Box>
  );
}
