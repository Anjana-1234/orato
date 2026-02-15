// src/models/settings.model.js
const mongoose = require('mongoose');

/**
 * Settings Schema - Database Structure
 * Defines how user settings data is stored in the database
 */
const settingsSchema = new mongoose.Schema({
    // User Reference - Links settings to a specific user
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                    // References the User model
        required: true,                 // Mandatory field
        unique: true,                   // Ensures one settings record per user
        index: true                     // Index for faster search performance
    },

    // Language Setting
    language: {
        type: String,                   // Text data
        default: 'English',             // Default language
        enum: ['English', 'Sinhala', 'Tamil', 'Spanish', 'French'],  // Allowed values
        trim: true                      // Removes leading/trailing whitespace
    },

    // Notification Settings - Nested object
    notifications: {
        pushNotifications: {
            type: Boolean,                // true/false
            default: true
        },
        dailyReminder: {
            type: Boolean,
            default: true
        },
        progressUpdates: {
            type: Boolean,
            default: true
        },
        reminderTime: {
            type: String,
            default: '07:00 PM',
            // Validates time format
            validate: {
                validator: function (v) {
                    // Checks for HH:MM AM/PM format
                    return /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(v);
                },
                message: props => `${props.value} is not a valid time format!`
            }
        }
    },

    // Audio & Display Settings
    audioDisplay: {
        soundEffects: {
            type: Boolean,
            default: true
        },
        darkMode: {
            type: Boolean,
            default: false
        },
        playbackSpeed: {
            type: String,
            default: '1.0x (Normal)',
            enum: [
                '0.5x (Slow)',
                '0.75x',
                '1.0x (Normal)',
                '1.25x',
                '1.5x',
                '2.0x (Fast)'
            ]
        }
    },

    // Timestamps - Automatically managed by Mongoose
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  // Automatically manages createdAt and updatedAt fields
});

// Add index for fast queries
settingsSchema.index({ userId: 1 });

// Create the model
const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;