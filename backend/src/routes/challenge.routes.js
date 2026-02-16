const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../middleware/validate.middleware');
const {
  getAllChallenges,
  getChallengeById,
  updateProgress,
  incrementProgress,
  getTodaySummary,
  refreshChallenges
} = require('../controllers/challenge.controller');

// All challenge routes require authentication
router.use(authenticate);

// Challenge routes
router.get('/', getAllChallenges);
router.get('/today', getTodaySummary);
router.get('/:id', getChallengeById);
router.put('/:id/progress', validate(schemas.updateChallenge), updateProgress);
router.post('/:id/increment', incrementProgress);
router.post('/refresh', refreshChallenges);

module.exports = router;
