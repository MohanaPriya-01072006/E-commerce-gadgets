import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, Container, Typography, TextField, Button, 
  Paper, Divider, IconButton, InputAdornment, Alert, CircularProgress 
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import { useAuth } from '../Context/AuthContext';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)' }} />
      <Box sx={{ position: 'absolute', bottom: -150, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box component={RouterLink} to="/" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 3, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: '#fff', textDecoration: 'none', fontWeight: 900, fontSize: 20, mb: 2 }}>
              MX
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>Create an Account</Typography>
            <Typography variant="body2" color="text.secondary">Join MopriX and get access to exclusive tech deals</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSignup}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Full Name"
                type="text"
                required
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email Address"
                type="email"
                required
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5, mt: 1, fontWeight: 700 }}>
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>
            </Box>
          </form>

          <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>OR CONTINUE WITH</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth startIcon={<Google />} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { bgcolor: 'background.default' } }}>
              Google
            </Button>
            <Button variant="outlined" fullWidth startIcon={<Facebook sx={{ color: '#1877F2' }} />} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { bgcolor: 'background.default' } }}>
              Facebook
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Typography component={RouterLink} to="/login" variant="body2" sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Sign in
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}