// Load environment variables first
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

const app = express();

// Debug environment check
console.log('Loaded environment variables:', {
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
});

// Middleware - Updated CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://tce-alumni-portal.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced Firebase Admin Setup
if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log('Firebase Admin initialized from env vars.');
  } catch (error) {
    console.error('Firebase env var initialization error:', error);
  }
} else {
  try {
    const serviceAccount = require('./config/firebase-service-account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log('Firebase Admin initialized from file.');
  } catch (error) {
    console.error('Firebase file initialization error:', error);
  }
}

// Route loading with better error handling
const loadRoutes = async () => {
  try {
    const placementRoutes = require('./routes/placementRoutes');
    const authRoutes = require('./routes/authRoutes');

    // Fixed route paths without regex issues
    app.use('/api/placement', placementRoutes);
    app.use('/api/auth', authRoutes);

    console.log('Routes loaded successfully');
  } catch (error) {
    console.error('Route loading error:', error);
    throw error;
  }
};

// Serve React frontend in production
const setupProduction = () => {
  if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/build');
    
    // Verify the build exists
    try {
      require('fs').accessSync(frontendPath);
      app.use(express.static(frontendPath));
      
      // Fixed catch-all route
      app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
      });
      console.log('Production frontend configured');
    } catch (err) {
      console.error('Frontend build not found:', err);
    }
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Initialize server
const startServer = async () => {
  try {
    await loadRoutes();
    setupProduction();

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Enhanced error handlers
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('Server initialization failed:', error);
    process.exit(1);
  }
};

startServer();