const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

/**
 * Express App Setup
 * Main application configuration
 */

// Initialize Express app
const app = express();

// ==================== MIDDLEWARE ====================
/**
 * Middleware functions run before the request reaches the server.
 * Used for data processing, validation, and security.
 */

// CORS - Allow frontend to access the backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',  // Frontend URL
  credentials: true,                  // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));

// JSON Parser - Parse JSON data in the request body
app.use(express.json());

// URL Encoded Data Parser - Parse form data
app.use(express.urlencoded({ extended: true }));

// Request Logging - Log requests in development mode
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📨 ${req.method} ${req.path}`);
  }
  next();
});

// ==================== DATABASE CONNECTION ====================
// Connect to MongoDB
connectDB();

// ==================== ROUTES ====================
/**
 * API Routes - Endpoints
 * Frontend sends requests to these URLs
 */

// Health Check Route - Test if the server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Import Settings Routes
const settingsRoutes = require('./routes/settings.routes');

// Use Settings Routes - Under /api/settings path
app.use('/api/settings', settingsRoutes);

// ==================== ROOT ROUTE ====================
// Handle requests to the root URL
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to ORATO API! 🎓',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      settings: '/api/settings',
    }
  });
});

// ==================== 404 HANDLER ====================
// Middleware to handle routes that are not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// ==================== ERROR HANDLER ====================
// Global middleware to handle application errors
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;