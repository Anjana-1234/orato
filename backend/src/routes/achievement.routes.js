const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const {
  getUserAchievements,
  getAllAchievements,
  getAchievementById,
  unlockAchievement,
  getAchievementProgress,
  getRecentAchievements
} = require('../controllers/achievement.controller');

// All achievement routes require authentication
router.use(authenticate);

// Achievement routes
router.get('/', getUserAchievements);
router.get('/all', getAllAchievements);
router.get('/progress', getAchievementProgress);
router.get('/recent', getRecentAchievements);
router.get('/:id', getAchievementById);
router.post('/:id/unlock', unlockAchievement);

module.exports = router;
