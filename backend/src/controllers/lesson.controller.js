const { lessons, userStats, activityHistory } = require('../models/mockData');

/**
 * Get all lessons
 * GET /api/lessons
 */
const getAllLessons = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, status } = req.query;

    let userLessons = lessons.filter(l => l.userId === userId);

    // Filter by category
    if (category) {
      userLessons = userLessons.filter(l => l.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by status
    if (status) {
      switch (status) {
        case 'completed':
          userLessons = userLessons.filter(l => l.progress === 100);
          break;
        case 'in-progress':
          userLessons = userLessons.filter(l => l.progress > 0 && l.progress < 100);
          break;
        case 'not-started':
          userLessons = userLessons.filter(l => l.progress === 0);
          break;
      }
    }

    const formattedLessons = userLessons.map(l => ({
      id: l.id,
      title: l.title,
      category: l.category,
      timeLeft: l.timeLeft,
      totalTime: l.totalTime,
      progress: l.progress,
      icon: l.icon,
      iconBg: l.iconBg,
      lastAccessed: l.lastAccessed,
      status: l.progress === 100 ? 'completed' : l.progress > 0 ? 'in-progress' : 'not-started'
    }));

    res.status(200).json({
      status: 'success',
      data: { 
        lessons: formattedLessons,
        total: formattedLessons.length
      }
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get lessons'
    });
  }
};

/**
 * Get lesson by ID
 * GET /api/lessons/:id
 */
const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const lesson = lessons.find(l => l.id === id && l.userId === userId);

    if (!lesson) {
      return res.status(404).json({
        status: 'error',
        message: 'Lesson not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        lesson: {
          id: lesson.id,
          title: lesson.title,
          category: lesson.category,
          timeLeft: lesson.timeLeft,
          totalTime: lesson.totalTime,
          progress: lesson.progress,
          icon: lesson.icon,
          iconBg: lesson.iconBg,
          lastAccessed: lesson.lastAccessed,
          status: lesson.progress === 100 ? 'completed' : lesson.progress > 0 ? 'in-progress' : 'not-started'
        }
      }
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get lesson'
    });
  }
};

/**
 * Update lesson progress
 * PUT /api/lessons/:id/progress
 */
const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, timeSpent } = req.body;
    const userId = req.user.id;

    const lesson = lessons.find(l => l.id === id && l.userId === userId);

    if (!lesson) {
      return res.status(404).json({
        status: 'error',
        message: 'Lesson not found'
      });
    }

    // Update progress
    const oldProgress = lesson.progress;
    lesson.progress = Math.min(Math.max(progress, 0), 100);
    lesson.lastAccessed = new Date().toISOString();

    // Update time left calculation
    if (timeSpent) {
      const remainingMinutes = Math.max(0, lesson.totalTime - timeSpent);
      lesson.timeLeft = `${remainingMinutes} min left`;
    }

    // If lesson completed, update user stats
    if (lesson.progress === 100 && oldProgress < 100) {
      const stats = userStats[userId];
      if (stats) {
        stats.lessonsDone += 1;
        stats.totalPoints += 25; // Points for completing a lesson
      }

      // Add activity
      activityHistory.unshift({
        id: `activity-${Date.now()}`,
        userId,
        type: 'lesson_completed',
        title: `Completed ${lesson.title}`,
        points: 25,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Progress updated successfully',
      data: {
        lesson: {
          id: lesson.id,
          title: lesson.title,
          progress: lesson.progress,
          timeLeft: lesson.timeLeft,
          status: lesson.progress === 100 ? 'completed' : 'in-progress'
        },
        pointsEarned: lesson.progress === 100 && oldProgress < 100 ? 25 : 0
      }
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update progress'
    });
  }
};

/**
 * Start a new lesson
 * POST /api/lessons/:id/start
 */
const startLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const lesson = lessons.find(l => l.id === id && l.userId === userId);

    if (!lesson) {
      return res.status(404).json({
        status: 'error',
        message: 'Lesson not found'
      });
    }

    // Update last accessed
    lesson.lastAccessed = new Date().toISOString();

    // If not started, set initial progress
    if (lesson.progress === 0) {
      lesson.progress = 5; // Starting progress
    }

    res.status(200).json({
      status: 'success',
      message: 'Lesson started',
      data: {
        lesson: {
          id: lesson.id,
          title: lesson.title,
          progress: lesson.progress,
          timeLeft: lesson.timeLeft
        }
      }
    });
  } catch (error) {
    console.error('Start lesson error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to start lesson'
    });
  }
};

/**
 * Get lesson categories
 * GET /api/lessons/categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = [
      { id: 'grammar', name: 'Grammar', icon: '📚', color: '#8B5CF6' },
      { id: 'vocabulary', name: 'Vocabulary', icon: '📖', color: '#3B82F6' },
      { id: 'speaking', name: 'Speaking', icon: '🗣️', color: '#1DB954' },
      { id: 'listening', name: 'Listening', icon: '🎧', color: '#F97316' },
      { id: 'writing', name: 'Writing', icon: '✍️', color: '#EC4899' }
    ];

    res.status(200).json({
      status: 'success',
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get categories'
    });
  }
};

/**
 * Get recommended lessons
 * GET /api/lessons/recommended
 */
const getRecommended = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get lessons with progress between 0 and 90 (incomplete but started or not started)
    const recommendedLessons = lessons
      .filter(l => l.userId === userId && l.progress < 90)
      .sort((a, b) => b.progress - a.progress) // Prioritize lessons with more progress
      .slice(0, 3)
      .map(l => ({
        id: l.id,
        title: l.title,
        category: l.category,
        timeLeft: l.timeLeft,
        progress: l.progress,
        icon: l.icon,
        iconBg: l.iconBg,
        reason: l.progress > 0 ? 'Continue where you left off' : 'Recommended for your level'
      }));

    res.status(200).json({
      status: 'success',
      data: { lessons: recommendedLessons }
    });
  } catch (error) {
    console.error('Get recommended error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get recommended lessons'
    });
  }
};

module.exports = {
  getAllLessons,
  getLessonById,
  updateProgress,
  startLesson,
  getCategories,
  getRecommended
};
