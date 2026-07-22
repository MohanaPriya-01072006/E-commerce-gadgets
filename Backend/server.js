const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    db: mongoose.connection.readyState === 1
      ? 'connected'
      : 'disconnected'
  });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('👉 Make sure your Atlas cluster is running and your IP is whitelisted.');
    process.exit(1);
  });
