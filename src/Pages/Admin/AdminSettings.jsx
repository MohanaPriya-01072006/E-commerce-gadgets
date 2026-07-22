import React, { useState } from 'react';
import {
  Box, Typography, Card, TextField, Button, Divider,
  Snackbar, Alert, Switch, FormControlLabel, Avatar,
} from '@mui/material';
import { Save, Lock, Notifications, Palette } from '@mui/icons-material';
import { useAuth } from '../../Context/AuthContext';

export default function AdminSettings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newEnquiries: false,
  });

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Profile update would call the API here
    setToast({ open: true, message: 'Profile settings saved', severity: 'success' });
  };

  const handleNotificationSave = () => {
    setToast({ open: true, message: 'Notification preferences saved', severity: 'success' });
  };

  const SectionHeader = ({ icon, title, subtitle }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
      <Avatar sx={{ bgcolor: '#eff6ff', color: '#2563eb', width: 40, height: 40 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{title}</Typography>
        {subtitle && (
          <Typography sx={{ fontSize: 13, color: '#94a3b8' }}>{subtitle}</Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 3 }}>
        Settings
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 640 }}>
        {/* Profile */}
        <Card sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
          <SectionHeader
            icon={<Palette fontSize="small" />}
            title="Profile"
            subtitle="Update your admin display name and email"
          />
          <Divider sx={{ mb: 3 }} />
          <Box component="form" onSubmit={handleProfileSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              size="small"
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              size="small"
              fullWidth
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                sx={{
                  background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 12px rgba(37,99,235,0.3)' },
                }}
              >
                Save Profile
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Password */}
        <Card sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
          <SectionHeader
            icon={<Lock fontSize="small" />}
            title="Security"
            subtitle="Change your admin account password"
          />
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Current Password" type="password" size="small" fullWidth />
            <TextField label="New Password" type="password" size="small" fullWidth />
            <TextField label="Confirm New Password" type="password" size="small" fullWidth />
            <Box>
              <Button
                variant="contained"
                startIcon={<Lock />}
                onClick={() => setToast({ open: true, message: 'Password updated', severity: 'success' })}
                sx={{
                  background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 12px rgba(37,99,235,0.3)' },
                }}
              >
                Update Password
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Notifications */}
        <Card sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
          <SectionHeader
            icon={<Notifications fontSize="small" />}
            title="Notifications"
            subtitle="Choose which alerts you receive"
          />
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.newOrders}
                  onChange={(e) => setNotifications({ ...notifications, newOrders: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>New Orders</Typography>
                  <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>Get notified when a new order is placed</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.lowStock}
                  onChange={(e) => setNotifications({ ...notifications, lowStock: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Low Stock Alerts</Typography>
                  <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>Alert when product stock falls below threshold</Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.newEnquiries}
                  onChange={(e) => setNotifications({ ...notifications, newEnquiries: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>New Enquiries</Typography>
                  <Typography sx={{ fontSize: 12, color: '#94a3b8' }}>Get notified when a customer submits an enquiry</Typography>
                </Box>
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleNotificationSave}
              sx={{
                background: 'linear-gradient(135deg,#2563eb,#06b6d4)',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': { boxShadow: '0 4px 12px rgba(37,99,235,0.3)' },
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </Card>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={toast.severity} sx={{ fontWeight: 600 }} onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
