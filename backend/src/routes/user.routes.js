const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../middleware/validate.middleware');
const {
  getProfile,
  updateProfile,
  updateAvatar,
  getProgress,
  getSettings,
  updateSettings,
  deleteAccount
} = require('../controllers/user.controller');

// All user routes require authentication
router.use(authenticate);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', validate(schemas.updateProfile), updateProfile);
router.put('/avatar', updateAvatar);

// Progress route
router.get('/progress', getProgress);

// Settings routes
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Account deletion
router.delete('/account', deleteAccount);

module.exports = router;
