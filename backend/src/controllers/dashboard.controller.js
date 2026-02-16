const { 
  userStats, 
  lessons, 
  dailyChallenges, 
  skillProgress, 
  achievements,
  activityHistory 
} = require('../models/mockData');

/**
 * Get full dashboard data
 * GET /api/dashboard
 */
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's stats
    const stats = userStats[userId] || {
      dayStreak: 0,
      streakChange: 0,
      totalPoints: 0,
      rankPercentile: 0,
      badgesEarned: 0,
      badgesToNextLevel: 0,
      lessonsDone: 0,
      lessonsThisWeek: 0
    };

    // Get user's lessons
    const userLessons = lessons
      .filter(l => l.userId === userId)
      .sort((a, b) => a.order - b.order)
      .map(l => ({
        id: l.id,
        title: l.title,
        category: l.category,
        timeLeft: l.timeLeft,
        progress: l.progress,
        icon: l.icon,
        iconBg: l.iconBg
      }));

    // Get user's challenges
    const challenges = dailyChallenges
      .filter(c => c.userId === userId)
      .map(c => ({
        id: c.id,
        title: c.title,
        current: c.current,
        target: c.target,
        points: c.points,
        completed: c.completed
      }));

    // Get user's skills
    const skills = skillProgress
      .filter(s => s.userId === userId)
      .map(s => ({
        name: s.name,
        percentage: s.percentage,
        color: s.color
      }));

    // Get user's recent achievements
    const userAchievements = achievements
      .filter(a => a.userId === userId)
      .slice(0, 3)
      .map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        icon: a.icon,
        iconColor: a.iconColor,
        iconBg: a.iconBg,
        earnedAt: a.earnedAt
      }));

    // Get recent activity
    const recentActivity = activityHistory
      .filter(a => a.userId === userId)
      .slice(0, 5)
      .map(a => ({
        id: a.id,
        type: a.type,
        title: a.title,
        points: a.points,
        timestamp: a.timestamp
      }));

    res.status(200).json({
      status: 'success',
      data: {
        stats,
        continueLearning: userLessons,
        dailyChallenges: challenges,
        skillProgress: skills,
        recentAchievements: userAchievements,
        recentActivity
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get dashboard data'
    });
  }
};

/**
 * Get dashboard stats only
 * GET /api/dashboard/stats
 */
const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = userStats[userId];

    if (!stats) {
      return res.status(404).json({
        status: 'error',
        message: 'Stats not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { stats }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get stats'
    });
  }
};

/**
 * Get continue learning section
 * GET /api/dashboard/continue-learning
 */
const getContinueLearning = async (req, res) => {
  try {
    const userId = req.user.id;
    const userLessons = lessons
      .filter(l => l.userId === userId)
      .sort((a, b) => a.order - b.order)
      .map(l => ({
        id: l.id,
        title: l.title,
        category: l.category,
        timeLeft: l.timeLeft,
        totalTime: l.totalTime,
        progress: l.progress,
        icon: l.icon,
        iconBg: l.iconBg,
        lastAccessed: l.lastAccessed
      }));

    res.status(200).json({
      status: 'success',
      data: { lessons: userLessons }
    });
  } catch (error) {
    console.error('Get continue learning error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get lessons'
    });
  }
};

/**
 * Get daily challenges
 * GET /api/dashboard/challenges
 */
const getChallenges = async (req, res) => {
  try {
    const userId = req.user.id;
    const challenges = dailyChallenges
      .filter(c => c.userId === userId)
      .map(c => ({
        id: c.id,
        title: c.title,
        current: c.current,
        target: c.target,
        points: c.points,
        type: c.type,
        completed: c.completed,
        expiresAt: c.expiresAt
      }));

    res.status(200).json({
      status: 'success',
      data: { challenges }
    });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get challenges'
    });
  }
};

/**
 * Get skill progress
 * GET /api/dashboard/skills
 */
const getSkills = async (req, res) => {
  try {
    const userId = req.user.id;
    const skills = skillProgress
      .filter(s => s.userId === userId)
      .map(s => ({
        id: s.id,
        name: s.name,
        percentage: s.percentage,
        color: s.color,
        details: {
          totalWords: s.totalWords,
          masteredWords: s.masteredWords,
          totalRules: s.totalRules,
          masteredRules: s.masteredRules,
          totalExercises: s.totalExercises,
          completedExercises: s.completedExercises,
          totalAudio: s.totalAudio,
          completedAudio: s.completedAudio
        }
      }));

    res.status(200).json({
      status: 'success',
      data: { skills }
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get skills'
    });
  }
};

/**
 * Get recent achievements
 * GET /api/dashboard/achievements
 */
const getRecentAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    const userAchievements = achievements
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
      .slice(0, 5)
      .map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        icon: a.icon,
        iconColor: a.iconColor,
        iconBg: a.iconBg,
        earnedAt: a.earnedAt,
        rarity: a.rarity
      }));

    res.status(200).json({
      status: 'success',
      data: { achievements: userAchievements }
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get achievements'
    });
  }
};

/**
 * Get activity history
 * GET /api/dashboard/activity
 */
const getActivityHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10, offset = 0 } = req.query;

    const activity = activityHistory
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit))
      .map(a => ({
        id: a.id,
        type: a.type,
        title: a.title,
        points: a.points,
        timestamp: a.timestamp
      }));

    res.status(200).json({
      status: 'success',
      data: { 
        activity,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total: activityHistory.filter(a => a.userId === userId).length
        }
      }
    });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get activity history'
    });
  }
};

module.exports = {
  getDashboard,
  getStats,
  getContinueLearning,
  getChallenges,
  getSkills,
  getRecentAchievements,
  getActivityHistory
};
