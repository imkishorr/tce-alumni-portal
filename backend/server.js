// server.js - Production-ready configuration
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const app = express();

// Configuration Constants
const CONFIG = {
  PORT: process.env.PORT || 10000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://tce-alumni-portal.vercel.app',
  FIREBASE: {
    useEnv: !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
    configPath: './config/firebase-service-account.json'
  }
};

console.log('Server starting with configuration:', {
  ...CONFIG,
  FIREBASE: { ...CONFIG.FIREBASE, useEnv: Boolean(CONFIG.FIREBASE.useEnv) }
});

// Middleware Configuration
app.use(cors({
  origin: CONFIG.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Firebase Initialization
const initializeFirebase = () => {
  try {
    if (CONFIG.FIREBASE.useEnv) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
        ),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    } else if (fs.existsSync(CONFIG.FIREBASE.configPath)) {
      admin.initializeApp({
        credential: admin.credential.cert(require(CONFIG.FIREBASE.configPath)),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    }
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization failed:', error.message);
    if (CONFIG.NODE_ENV === 'production') process.exit(1);
  }
};
initializeFirebase();

// Route Configuration - SIMPLIFIED to avoid path-to-regexp issues
const configureRoutes = () => {
  // Basic route to verify server is running
  app.get('/api/status', (req, res) => {
    res.json({ 
      status: 'active', 
      environment: CONFIG.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  });

  // Load other routes safely
  try {
    app.use('/api/placement', require('./routes/placementRoutes'));
    app.use('/api/auth', require('./routes/authRoutes'));
    console.log('Routes configured successfully');
  } catch (error) {
    console.error('Route configuration failed:', error.message);
    if (CONFIG.NODE_ENV === 'production') process.exit(1);
  }
};
configureRoutes();

// Production Frontend Serving
if (CONFIG.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/build');
  
  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    
    // Handle client-side routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendPath, 'index.html'));
    });
    console.log('Production frontend configured');
  } else {
    console.warn('Frontend build not found at:', frontendPath);
  }
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(CONFIG.PORT, () => {
  console.log(`Server running on port ${CONFIG.PORT} in ${CONFIG.NODE_ENV} mode`);
});

// Process Event Handlers
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});