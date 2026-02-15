// src/routes/settings.routes.js
const express = require('express');
const router = express.Router();
const Settings = require('../models/settings.model');

// Middleware for authentication (optional - can be added later)
// const authenticate = require('../middleware/auth');

/**
 * API Routes - Endpoints
 * Frontend requests come to these URLs
 */

// ==================== GET SETTINGS ====================
/**
 * GET /api/settings/:userId
 * Fetch user settings
 */
router.get('/:userId', async (req, res) => {
    try {
        // Get userId from URL parameters
        const { userId } = req.params;

        console.log('📥 Fetching settings for user:', userId);

        // Find settings in the database
        let settings = await Settings.findOne({ userId });

        // If settings do not exist, create default settings
        if (!settings) {
            console.log('🆕 Creating default settings for user:', userId);

            settings = new Settings({
                userId,
                language: 'English',
                notifications: {
                    pushNotifications: true,
                    dailyReminder: true,
                    progressUpdates: true,
                    reminderTime: '07:00 PM'
                },
                audioDisplay: {
                    soundEffects: true,
                    darkMode: false,
                    playbackSpeed: '1.0x (Normal)'
                }
            });

            // Save to the database
            await settings.save();
        }

        // Send success response
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        // If an error occurs
        console.error('❌ Error fetching settings:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching settings',
            error: error.message
        });
    }
});

// ==================== UPDATE LANGUAGE ====================
/**
 * PUT /api/settings/language
 * Update language preference
 */
router.put('/language', async (req, res) => {
    try {
        const { userId, language } = req.body;

        console.log('📝 Updating language for user:', userId, 'to', language);

        // Validation
        if (!userId || !language) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: userId and language'
            });
        }

        // Check if language selection is valid
        const validLanguages = ['English', 'Sinhala', 'Tamil', 'Spanish', 'French'];
        if (!validLanguages.includes(language)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid language selection'
            });
        }

        // Update in database
        const settings = await Settings.findOneAndUpdate(
            { userId },           // Filter condition
            {
                language,           // Data to update
                updatedAt: Date.now()
            },
            {
                new: true,          // Return the updated document
                upsert: true        // Create new document if it doesn't exist
            }
        );

        res.status(200).json({
            success: true,
            message: 'Language updated successfully',
            data: settings
        });
    } catch (error) {
        console.error('❌ Error updating language:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating language',
            error: error.message
        });
    }
});

// ==================== UPDATE NOTIFICATIONS ====================
/**
 * PUT /api/settings/notifications
 * Update notification settings
 */
router.put('/notifications', async (req, res) => {
    try {
        const { userId, pushNotifications, dailyReminder, progressUpdates, reminderTime } = req.body;

        console.log('🔔 Updating notifications for user:', userId);

        // Validation
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required field: userId'
            });
        }

        // Perform update
        const settings = await Settings.findOneAndUpdate(
            { userId },
            {
                'notifications.pushNotifications': pushNotifications,
                'notifications.dailyReminder': dailyReminder,
                'notifications.progressUpdates': progressUpdates,
                'notifications.reminderTime': reminderTime,
                updatedAt: Date.now()
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: 'Notification settings updated successfully',
            data: settings
        });
    } catch (error) {
        console.error('❌ Error updating notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating notifications',
            error: error.message
        });
    }
});

// ==================== UPDATE AUDIO/DISPLAY ====================
/**
 * PUT /api/settings/audio-display
 * Update Audio and Display settings
 */
router.put('/audio-display', async (req, res) => {
    try {
        const { userId, soundEffects, darkMode, playbackSpeed } = req.body;

        console.log('🔊 Updating audio/display for user:', userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required field: userId'
            });
        }

        const settings = await Settings.findOneAndUpdate(
            { userId },
            {
                'audioDisplay.soundEffects': soundEffects,
                'audioDisplay.darkMode': darkMode,
                'audioDisplay.playbackSpeed': playbackSpeed,
                updatedAt: Date.now()
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: 'Audio and display settings updated successfully',
            data: settings
        });
    } catch (error) {
        console.error('❌ Error updating audio/display:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating audio/display settings',
            error: error.message
        });
    }
});

// ==================== REQUEST DATA DOWNLOAD ====================
/**
 * POST /api/settings/download-data
 * Request user data download
 */
router.post('/download-data', async (req, res) => {
    try {
        const { userId } = req.body;

        console.log('📥 Data download request from user:', userId);

        // Logic to implement:
        // 1. Collect user data
        // 2. Generate ZIP file
        // 3. Send email to user

        // Temporary simple response
        res.status(200).json({
            success: true,
            message: 'Data download request received. You will receive an email when your data is ready.'
        });
    } catch (error) {
        console.error('❌ Error processing data download:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing data download request',
            error: error.message
        });
    }
});

// ==================== DELETE ACCOUNT ====================
/**
 * DELETE /api/settings/account/:userId
 * Delete user account
 */
router.delete('/account/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        console.log('🗑️ Account deletion request from user:', userId);

        // Delete settings document
        await Settings.findOneAndDelete({ userId });

        // Logic to implement:
        // 1. Delete core user account
        // 2. Delete all associated user data
        // 3. Send confirmation email

        res.status(200).json({
            success: true,
            message: 'Account deletion initiated successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting account:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting account',
            error: error.message
        });
    }
});

module.exports = router;