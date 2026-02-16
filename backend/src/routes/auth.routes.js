const express = require('express');
const router = express.Router();

const { 
  login, 
  register, 
  refreshToken, 
  getMe, 
  logout 
} = require('../controllers/auth.controller');

const { authenticate } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../middleware/validate.middleware');

// Public routes
router.post('/login', validate(schemas.login), login);
router.post('/register', validate(schemas.register), register);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

module.exports = router;
