require('dotenv').config({ debug: true }); // Enable debug logging
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

const app = express();

// Verify environment variables
console.log('Environment variables:', {
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Firebase Admin Setup
try {
  const serviceAccount = require('./config/firebase-service-account.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
  process.exit(1);
}

// Import routes with error handling
let placementRoutes, authRoutes;
try {
  placementRoutes = require('./routes/placementRoutes');
  authRoutes = require('./routes/authRoutes');
} catch (error) {
  console.error('Route loading error:', error);
  process.exit(1);
}

// API Routes - wrap in try-catch to catch path-to-regexp errors
try {
  app.use('/api/placement', placementRoutes);
  app.use('/api/auth', authRoutes);
} catch (error) {
  console.error('Route registration error:', error);
  process.exit(1);
}

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Error handlers
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});