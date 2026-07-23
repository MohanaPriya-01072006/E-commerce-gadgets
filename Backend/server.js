const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
// Allow the Vercel frontend, localhost dev, and any PR-preview URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,           // e.g. https://e-commerce-gadgets.vercel.app
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    // Allow any vercel.app subdomain (PR previews)
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    // Allow exact matches
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/authRoutes'));
app.use('/api/products',     require('./routes/productRoutes'));
app.use('/api/orders',       require('./routes/orderRoutes'));
app.use('/api/enquiries',    require('./routes/enquiryRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Global error:', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// ── Connect to MongoDB then start server ──────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
const PORT      = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not set in environment variables!');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET is not set — using fallback. Set it in Render environment variables!');
}

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS:          45000,
  })
  .then(() => {
    console.log('✅ MongoDB connected — DB:', mongoose.connection.db.databaseName);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('👉 Check MONGO_URI in Render environment variables.');
    process.exit(1);
  });
