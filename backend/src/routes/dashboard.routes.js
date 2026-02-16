const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const {
  getDashboard,
  getStats,
  getContinueLearning,
  getChallenges,
  getSkills,
  getRecentAchievements,
  getActivityHistory
} = require('../controllers/dashboard.controller');

// All dashboard routes require authentication
router.use(authenticate);

// Main dashboard endpoint - returns all data
router.get('/', getDashboard);

// Individual sections
router.get('/stats', getStats);
router.get('/continue-learning', getContinueLearning);
router.get('/challenges', getChallenges);
router.get('/skills', getSkills);
router.get('/achievements', getRecentAchievements);
router.get('/activity', getActivityHistory);

module.exports = router;
