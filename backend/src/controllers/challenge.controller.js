const { dailyChallenges, userStats, activityHistory } = require('../models/mockData');

/**
 * Get all challenges
 * GET /api/challenges
 */
const getAllChallenges = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let challenges = dailyChallenges.filter(c => c.userId === userId);

    // Filter by status
    if (status) {
      switch (status) {
        case 'completed':
          challenges = challenges.filter(c => c.completed || c.current >= c.target);
          break;
        case 'pending':
          challenges = challenges.filter(c => !c.completed && c.current < c.target);
          break;
      }
    }

    const formattedChallenges = challenges.map(c => ({
      id: c.id,
      title: c.title,
      current: c.current,
      target: c.target,
      points: c.points,
      type: c.type,
      completed: c.current >= c.target,
      progress: Math.min((c.current / c.target) * 100, 100),
      expiresAt: c.expiresAt
    }));

    res.status(200).json({
      status: 'success',
      data: {
        challenges: formattedChallenges,
        total: formattedChallenges.length,
        completed: formattedChallenges.filter(c => c.completed).length
      }
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
 * Get challenge by ID
 * GET /api/challenges/:id
 */
const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const challenge = dailyChallenges.find(c => c.id === id && c.userId === userId);

    if (!challenge) {
      return res.status(404).json({
        status: 'error',
        message: 'Challenge not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        challenge: {
          id: challenge.id,
          title: challenge.title,
          current: challenge.current,
          target: challenge.target,
          points: challenge.points,
          type: challenge.type,
          completed: challenge.current >= challenge.target,
          progress: Math.min((challenge.current / challenge.target) * 100, 100),
          expiresAt: challenge.expiresAt
        }
      }
    });
  } catch (error) {
    console.error('Get challenge error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get challenge'
    });
  }
};

/**
 * Update challenge progress
 * PUT /api/challenges/:id/progress
 */
const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { current } = req.body;
    const userId = req.user.id;

    const challenge = dailyChallenges.find(c => c.id === id && c.userId === userId);

    if (!challenge) {
      return res.status(404).json({
        status: 'error',
        message: 'Challenge not found'
      });
    }

    const wasCompleted = challenge.current >= challenge.target;
    const oldCurrent = challenge.current;

    // Update progress
    challenge.current = Math.min(Math.max(current, 0), challenge.target);

    // Check if newly completed
    const isNowCompleted = challenge.current >= challenge.target && !wasCompleted;

    if (isNowCompleted) {
      // Award points
      const stats = userStats[userId];
      if (stats) {
        stats.totalPoints += challenge.points;
      }

      // Add activity
      activityHistory.unshift({
        id: `activity-${Date.now()}`,
        userId,
        type: 'challenge_completed',
        title: `Completed challenge: ${challenge.title}`,
        points: challenge.points,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      status: 'success',
      message: isNowCompleted ? 'Challenge completed!' : 'Progress updated',
      data: {
        challenge: {
          id: challenge.id,
          title: challenge.title,
          current: challenge.current,
          target: challenge.target,
          progress: Math.min((challenge.current / challenge.target) * 100, 100),
          completed: challenge.current >= challenge.target
        },
        pointsEarned: isNowCompleted ? challenge.points : 0,
        newlyCompleted: isNowCompleted
      }
    });
  } catch (error) {
    console.error('Update challenge error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update challenge'
    });
  }
};

/**
 * Increment challenge progress
 * POST /api/challenges/:id/increment
 */
const incrementProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount = 1 } = req.body;
    const userId = req.user.id;

    const challenge = dailyChallenges.find(c => c.id === id && c.userId === userId);

    if (!challenge) {
      return res.status(404).json({
        status: 'error',
        message: 'Challenge not found'
      });
    }

    const wasCompleted = challenge.current >= challenge.target;
    challenge.current = Math.min(challenge.current + amount, challenge.target);

    // Check if newly completed
    const isNowCompleted = challenge.current >= challenge.target && !wasCompleted;

    if (isNowCompleted) {
      const stats = userStats[userId];
      if (stats) {
        stats.totalPoints += challenge.points;
      }

      activityHistory.unshift({
        id: `activity-${Date.now()}`,
        userId,
        type: 'challenge_completed',
        title: `Completed challenge: ${challenge.title}`,
        points: challenge.points,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      status: 'success',
      message: isNowCompleted ? 'Challenge completed!' : 'Progress updated',
      data: {
        challenge: {
          id: challenge.id,
          title: challenge.title,
          current: challenge.current,
          target: challenge.target,
          progress: Math.min((challenge.current / challenge.target) * 100, 100),
          completed: challenge.current >= challenge.target
        },
        pointsEarned: isNowCompleted ? challenge.points : 0
      }
    });
  } catch (error) {
    console.error('Increment challenge error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update challenge'
    });
  }
};

/**
 * Get today's challenges summary
 * GET /api/challenges/today
 */
const getTodaySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const challenges = dailyChallenges.filter(c => c.userId === userId);

    const total = challenges.length;
    const completed = challenges.filter(c => c.current >= c.target).length;
    const totalPoints = challenges
      .filter(c => c.current >= c.target)
      .reduce((sum, c) => sum + c.points, 0);
    const availablePoints = challenges
      .filter(c => c.current < c.target)
      .reduce((sum, c) => sum + c.points, 0);

    res.status(200).json({
      status: 'success',
      data: {
        summary: {
          total,
          completed,
          remaining: total - completed,
          completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
          pointsEarned: totalPoints,
          pointsAvailable: availablePoints
        },
        challenges: challenges.map(c => ({
          id: c.id,
          title: c.title,
          current: c.current,
          target: c.target,
          points: c.points,
          completed: c.current >= c.target
        }))
      }
    });
  } catch (error) {
    console.error('Get today summary error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get today\'s summary'
    });
  }
};

/**
 * Refresh daily challenges (admin or cron job)
 * POST /api/challenges/refresh
 */
const refreshChallenges = async (req, res) => {
  try {
    const userId = req.user.id;

    // In production, this would generate new challenges based on user's level and progress
    // For now, reset the existing challenges
    const userChallenges = dailyChallenges.filter(c => c.userId === userId);
    
    userChallenges.forEach(challenge => {
      challenge.current = 0;
      challenge.completed = false;
      challenge.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours from now
    });

    res.status(200).json({
      status: 'success',
      message: 'Daily challenges refreshed',
      data: {
        challenges: userChallenges.map(c => ({
          id: c.id,
          title: c.title,
          target: c.target,
          points: c.points
        }))
      }
    });
  } catch (error) {
    console.error('Refresh challenges error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to refresh challenges'
    });
  }
};

module.exports = {
  getAllChallenges,
  getChallengeById,
  updateProgress,
  incrementProgress,
  getTodaySummary,
  refreshChallenges
};
