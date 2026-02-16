const jwt = require('jsonwebtoken');

// Mock user for development (replace with DB lookup)
const { users } = require('../models/mockData');

/**
 * Authentication middleware - verifies JWT token
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production');
    
    // Find user (replace with DB query)
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please login again.'
      });
    }
    
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};

/**
 * Optional authentication - doesn't require token but attaches user if present
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production');
      const user = users.find(u => u.id === decoded.userId);
      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without user
    next();
  }
};

/**
 * Generate JWT tokens
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-this-in-production',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );

  return { accessToken, refreshToken };
};

module.exports = {
  authenticate,
  optionalAuth,
  generateTokens
};
