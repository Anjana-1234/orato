const bcrypt = require('bcryptjs');
const { users } = require('../models/mockData');
const { generateTokens } = require('../middleware/auth.middleware');

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user (replace with DB query)
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // In production, verify password hash
    // const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    // For mock data, accept any password
    const isValidPassword = true;

    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const tokens = generateTokens(user.id);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          level: user.level
        },
        tokens
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed'
    });
  }
};

/**
 * Register new user
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password, level = 'Beginner' } = req.body;

    // Check if user exists (replace with DB query)
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'User already exists with this email'
      });
    }

    // In production, hash password
    // const passwordHash = await bcrypt.hash(password, 10);

    // Create new user (replace with DB insert)
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      level,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    users.push(newUser);

    // Generate tokens
    const tokens = generateTokens(newUser.id);

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          level: newUser.level
        },
        tokens
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Registration failed'
    });
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token required'
      });
    }

    // Verify refresh token
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-this-in-production'
    );

    // Generate new tokens
    const tokens = generateTokens(decoded.userId);

    res.status(200).json({
      status: 'success',
      message: 'Token refreshed',
      data: { tokens }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      status: 'error',
      message: 'Invalid refresh token'
    });
  }
};

/**
 * Get current user
 * GET /api/auth/me
 */
const getMe = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          level: user.level,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get user info'
    });
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
const logout = async (req, res) => {
  // In production, invalidate token in database or Redis
  res.status(200).json({
    status: 'success',
    message: 'Logout successful'
  });
};

module.exports = {
  login,
  register,
  refreshToken,
  getMe,
  logout
};
