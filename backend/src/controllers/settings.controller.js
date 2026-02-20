import Settings from '../models/settings.model.js';
import User from '../models/user.js';

// GET /api/settings/userId.
// Loads user settings.
// Creates settings with default values if not found.
export const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ userId: req.params.userId });
        if (!settings) {
            settings = await Settings.create({ userId: req.params.userId });
        }
        res.json({ success: true, settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
// PUT /api/settings/userId.
// Updating Notifications or AudioDisplay settings.
// Body example: { "notifications": { "pushNotifications": false } }.
*/
export const updateSettings = async (req, res) => {
    try {
        const settings = await Settings.findOneAndUpdate(
            { userId: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true, upsert: true }
        );
        res.json({ success: true, settings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/*
// DELETE /api/settings/userId.
// Deletes both the user account and settings.
*/
export const deleteAccount = async (req, res) => {
    try {
        await Settings.findOneAndDelete({ userId: req.params.userId });
        await User.findByIdAndDelete(req.params.userId);
        res.json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
// GET /api/settings/userId/download.
// Download user data and settings.
*/
export const downloadUserData = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const settings = await Settings.findOne({ userId: req.params.userId });

        const exportData = {
            exportedAt: new Date().toISOString(),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                age: user.age,
                nativeLanguage: user.nativeLanguage,
                targetLanguage: user.targetLanguage,
                learningGoal: user.learningGoal,
                dailyGoalMinutes: user.dailyGoalMinutes,
                skillLevel: user.skillLevel,
                assessmentScore: user.assessmentScore,
                createdAt: user.createdAt,
            },
            settings: settings || 'No settings saved yet',
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=my_orato_data.json');
        res.send(JSON.stringify(exportData, null, 2));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};