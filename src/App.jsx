import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Sparkles } from 'lucide-react';
import { DarkModeProvider } from './Context/DarkModeContext';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { ProductProvider } from './Context/ProductContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AppRoutes from './Routes/AppRoutes';
import GlassBallsBackground from './Components/GlassBallsBackground';
import MoprixHelper from './Components/Helper/MoprixHelper';

export default function App() {
  const [helperOpen, setHelperOpen] = useState(false);

  return (
    <DarkModeProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <GlassBallsBackground />

              <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
                <Navbar onOpenHelper={() => setHelperOpen(true)} />
                <main className="flex-1">
                  <AppRoutes />
                </main>
                <Footer />
              </div>

              {/* MoPrix Helper floating button removed as requested */}

              {/* ── Helper panel ── */}
              {helperOpen && <MoprixHelper onClose={() => setHelperOpen(false)} />}

              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: '14px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    background: 'rgba(255,255,255,0.96)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    color: '#0f172a',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    marginBottom: '70px',
                  },
                  success: { style: { background: '#22C55E', color: '#fff', border: 'none', marginBottom: '70px' } },
                  error:   { style: { background: '#EF4444', color: '#fff', border: 'none', marginBottom: '70px' } },
                }}
              />
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}
