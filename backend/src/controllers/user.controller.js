const { users, userStats } = require('../models/mockData');

/**
 * Get user profile
 * GET /api/users/profile
 */
const getProfile = async (req, res) => {
  try {
    const user = req.user;
    const stats = userStats[user.id];

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          level: user.level,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin
        },
        stats: stats || null
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get profile'
    });
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { name, level } = req.body;
    const user = req.user;

    // Update user (replace with DB update)
    if (name) user.name = name;
    if (level) user.level = level;

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          level: user.level
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update profile'
    });
  }
};

/**
 * Update user avatar
 * PUT /api/users/avatar
 */
const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = req.user;

    // Update avatar (replace with DB update and file upload)
    user.avatar = avatar;

    res.status(200).json({
      status: 'success',
      message: 'Avatar updated successfully',
      data: {
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update avatar'
    });
  }
};

/**
 * Get user progress
 * GET /api/users/progress
 */
const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = userStats[userId];

    if (!stats) {
      return res.status(404).json({
        status: 'error',
        message: 'Progress not found'
      });
    }

    // Calculate additional metrics
    const totalLessons = stats.lessonsDone;
    const weeklyGoal = 10;
    const weeklyProgress = Math.min((stats.lessonsThisWeek / weeklyGoal) * 100, 100);

    res.status(200).json({
      status: 'success',
      data: {
        progress: {
          ...stats,
          weeklyGoal,
          weeklyProgress,
          nextMilestone: {
            name: 'Complete 50 lessons',
            current: totalLessons,
            target: 50,
            remaining: Math.max(50 - totalLessons, 0)
          }
        }
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get progress'
    });
  }
};

/**
 * Get user settings
 * GET /api/users/settings
 */
const getSettings = async (req, res) => {
  try {
    // In production, fetch from DB
    const defaultSettings = {
      notifications: {
        email: true,
        push: true,
        dailyReminder: true,
        challengeComplete: true,
        achievementUnlock: true
      },
      preferences: {
        language: 'en',
        theme: 'light',
        soundEffects: true,
        autoPlay: false
      },
      privacy: {
        publicProfile: false,
        showProgress: true,
        allowFriendRequests: true
      }
    };

    res.status(200).json({
      status: 'success',
      data: { settings: defaultSettings }
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get settings'
    });
  }
};

/**
 * Update user settings
 * PUT /api/users/settings
 */
const updateSettings = async (req, res) => {
  try {
    const { notifications, preferences, privacy } = req.body;

    // In production, update in DB
    const updatedSettings = {
      notifications: notifications || {},
      preferences: preferences || {},
      privacy: privacy || {}
    };

    res.status(200).json({
      status: 'success',
      message: 'Settings updated successfully',
      data: { settings: updatedSettings }
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update settings'
    });
  }
};

/**
 * Delete user account
 * DELETE /api/users/account
 */
const deleteAccount = async (req, res) => {
  try {
    const user = req.user;

    // In production, delete from DB and all associated data
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex > -1) {
      users.splice(userIndex, 1);
    }

    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete account'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar,
  getProgress,
  getSettings,
  updateSettings,
  deleteAccount
};
