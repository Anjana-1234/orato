const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/auth.middleware');
const { validate, schemas } = require('../middleware/validate.middleware');
const {
  getAllLessons,
  getLessonById,
  updateProgress,
  startLesson,
  getCategories,
  getRecommended
} = require('../controllers/lesson.controller');

// All lesson routes require authentication
router.use(authenticate);

// Lesson routes
router.get('/', getAllLessons);
router.get('/categories', getCategories);
router.get('/recommended', getRecommended);
router.get('/:id', getLessonById);
router.put('/:id/progress', validate(schemas.updateLessonProgress), updateProgress);
router.post('/:id/start', startLesson);

module.exports = router;
