import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2f5cff', dark: '#1d43d6', light: '#e8edff', contrastText: '#ffffff' },
    secondary: { main: '#ff6a3d', dark: '#e34e25', light: '#fff0ea', contrastText: '#ffffff' },
    background: { default: '#f7f6f2', paper: '#ffffff' },
    text: { primary: '#172033', secondary: '#687082' },
    success: { main: '#1c9b69' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.055em' },
    h2: { fontWeight: 750, letterSpacing: '-0.04em' },
    h3: { fontWeight: 750, letterSpacing: '-0.035em' },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 12, padding: '11px 19px', boxShadow: 'none' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 18, boxShadow: 'none', border: '1px solid #e8e8e4' } } },
  },
});

export default theme;
