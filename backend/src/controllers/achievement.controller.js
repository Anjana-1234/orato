const { achievements, allAchievements, userStats, activityHistory } = require('../models/mockData');

/**
 * Get user's achievements
 * GET /api/achievements
 */
const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    const userAchievements = achievements.filter(a => a.userId === userId);

    const formattedAchievements = userAchievements.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description,
      icon: a.icon,
      iconColor: a.iconColor,
      iconBg: a.iconBg,
      earnedAt: a.earnedAt,
      rarity: a.rarity
    }));

    // Calculate stats
    const rarityCount = {
      common: formattedAchievements.filter(a => a.rarity === 'common').length,
      rare: formattedAchievements.filter(a => a.rarity === 'rare').length,
      epic: formattedAchievements.filter(a => a.rarity === 'epic').length,
      legendary: formattedAchievements.filter(a => a.rarity === 'legendary').length
    };

    res.status(200).json({
      status: 'success',
      data: {
        achievements: formattedAchievements,
        stats: {
          total: formattedAchievements.length,
          byRarity: rarityCount
        }
      }
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
 * Get all available achievements
 * GET /api/achievements/all
 */
const getAllAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    const userAchievementIds = achievements
      .filter(a => a.userId === userId)
      .map(a => a.id);

    const formattedAchievements = allAchievements.map(a => ({
      ...a,
      earned: userAchievementIds.includes(a.id),
      earnedAt: userAchievementIds.includes(a.id) 
        ? achievements.find(ua => ua.id === a.id)?.earnedAt 
        : null
    }));

    res.status(200).json({
      status: 'success',
      data: {
        achievements: formattedAchievements,
        total: formattedAchievements.length,
        earned: userAchievementIds.length
      }
    });
  } catch (error) {
    console.error('Get all achievements error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get achievements'
    });
  }
};

/**
 * Get achievement by ID
 * GET /api/achievements/:id
 */
const getAchievementById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const achievement = allAchievements.find(a => a.id === id);

    if (!achievement) {
      return res.status(404).json({
        status: 'error',
        message: 'Achievement not found'
      });
    }

    const userAchievement = achievements.find(a => a.id === id && a.userId === userId);

    res.status(200).json({
      status: 'success',
      data: {
        achievement: {
          ...achievement,
          earned: !!userAchievement,
          earnedAt: userAchievement?.earnedAt || null
        }
      }
    });
  } catch (error) {
    console.error('Get achievement error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get achievement'
    });
  }
};

/**
 * Unlock an achievement (internal use or admin)
 * POST /api/achievements/:id/unlock
 */
const unlockAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if achievement exists
    const achievementTemplate = allAchievements.find(a => a.id === id);
    if (!achievementTemplate) {
      return res.status(404).json({
        status: 'error',
        message: 'Achievement not found'
      });
    }

    // Check if already unlocked
    const existingAchievement = achievements.find(a => a.id === id && a.userId === userId);
    if (existingAchievement) {
      return res.status(409).json({
        status: 'error',
        message: 'Achievement already unlocked'
      });
    }

    // Create new achievement
    const newAchievement = {
      id: achievementTemplate.id,
      userId,
      title: achievementTemplate.title,
      description: achievementTemplate.description,
      icon: achievementTemplate.icon,
      iconColor: getIconColor(achievementTemplate.rarity),
      iconBg: getIconBg(achievementTemplate.rarity),
      earnedAt: new Date().toISOString(),
      rarity: achievementTemplate.rarity
    };

    achievements.push(newAchievement);

    // Award points
    const stats = userStats[userId];
    if (stats) {
      stats.totalPoints += achievementTemplate.points;
      stats.badgesEarned += 1;
    }

    // Add activity
    activityHistory.unshift({
      id: `activity-${Date.now()}`,
      userId,
      type: 'achievement_unlocked',
      title: `Unlocked: ${achievementTemplate.title}`,
      points: achievementTemplate.points,
      timestamp: new Date().toISOString()
    });

    res.status(201).json({
      status: 'success',
      message: 'Achievement unlocked!',
      data: {
        achievement: {
          id: newAchievement.id,
          title: newAchievement.title,
          description: newAchievement.description,
          icon: newAchievement.icon,
          iconColor: newAchievement.iconColor,
          iconBg: newAchievement.iconBg,
          earnedAt: newAchievement.earnedAt,
          rarity: newAchievement.rarity
        },
        pointsEarned: achievementTemplate.points
      }
    });
  } catch (error) {
    console.error('Unlock achievement error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to unlock achievement'
    });
  }
};

/**
 * Get achievement progress
 * GET /api/achievements/progress
 */
const getAchievementProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const userAchievementIds = achievements
      .filter(a => a.userId === userId)
      .map(a => a.id);

    const totalAchievements = allAchievements.length;
    const earnedAchievements = userAchievementIds.length;
    const completionPercentage = Math.round((earnedAchievements / totalAchievements) * 100);

    // Get next achievable achievements
    const nextAchievements = allAchievements
      .filter(a => !userAchievementIds.includes(a.id))
      .slice(0, 3)
      .map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        icon: a.icon,
        points: a.points,
        rarity: a.rarity
      }));

    res.status(200).json({
      status: 'success',
      data: {
        progress: {
          total: totalAchievements,
          earned: earnedAchievements,
          remaining: totalAchievements - earnedAchievements,
          completionPercentage
        },
        nextAchievements
      }
    });
  } catch (error) {
    console.error('Get achievement progress error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get achievement progress'
    });
  }
};

/**
 * Get recent achievements (last 30 days)
 * GET /api/achievements/recent
 */
const getRecentAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentAchievements = achievements
      .filter(a => {
        return a.userId === userId && new Date(a.earnedAt) >= thirtyDaysAgo;
      })
      .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
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
      data: {
        achievements: recentAchievements,
        count: recentAchievements.length
      }
    });
  } catch (error) {
    console.error('Get recent achievements error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get recent achievements'
    });
  }
};

// Helper functions
function getIconColor(rarity) {
  const colors = {
    common: 'text-gray-500',
    rare: 'text-blue-500',
    epic: 'text-purple-500',
    legendary: 'text-yellow-500'
  };
  return colors[rarity] || colors.common;
}

function getIconBg(rarity) {
  const bgs = {
    common: 'bg-gray-100',
    rare: 'bg-blue-100',
    epic: 'bg-purple-100',
    legendary: 'bg-yellow-100'
  };
  return bgs[rarity] || bgs.common;
}

module.exports = {
  getUserAchievements,
  getAllAchievements,
  getAchievementById,
  unlockAchievement,
  getAchievementProgress,
  getRecentAchievements
};
