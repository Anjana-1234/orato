import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch.tsx';
import type { NotificationSettings, NotificationsProps } from '../types/settings.types';

/**
 * Notifications Component
 * Controls for push notifications, daily reminders, and progress updates
 */
const Notifications: React.FC<NotificationsProps> = ({
    settings,
    onChange
}) => {
    // Default settings if not provided
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        pushNotifications: settings?.pushNotifications ?? true,
        dailyReminder: settings?.dailyReminder ?? true,
        progressUpdates: settings?.progressUpdates ?? false,
        reminderTime: settings?.reminderTime ?? '09:00'
    });

    // Helper to update settings
    const updateSettings = (key: keyof NotificationSettings, value: boolean | string) => {
        const newSettings = {
            ...notificationSettings,
            [key]: value
        };

        setNotificationSettings(newSettings);

        if (onChange) {
            onChange(newSettings);
        }

        console.log(`${key} updated to:`, value);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Section Header */}
            <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                    <p className="text-sm text-gray-500">Manage how you want to be notified</p>
                </div>
            </div>

            {/* Settings */}
            <div className="space-y-6">
                {/* Push Notifications */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100 pb-4">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Push Notifications</h3>
                        <p className="text-sm text-gray-500 mt-1">Receive notifications on your device</p>
                    </div>
                    <ToggleSwitch
                        checked={notificationSettings.pushNotifications}
                        onChange={() => updateSettings('pushNotifications', !notificationSettings.pushNotifications)}
                        ariaLabel="Toggle push notifications"
                    />
                </div>

                {/* Daily Reminder */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100 pb-4">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Daily Reminder</h3>
                        <p className="text-sm text-gray-500 mt-1">Get reminded to practice every day</p>
                    </div>
                    <ToggleSwitch
                        checked={notificationSettings.dailyReminder}
                        onChange={() => updateSettings('dailyReminder', !notificationSettings.dailyReminder)}
                        ariaLabel="Toggle daily reminder"
                    />
                </div>

                {/* Reminder Time (only show if daily reminder is enabled) */}
                {notificationSettings.dailyReminder && (
                    <div className="py-2 border-b border-gray-100 pb-4 pl-4 border-l-2 border-blue-100">
                        <label
                            htmlFor="reminder-time"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Reminder Time
                        </label>
                        <input
                            type="time"
                            id="reminder-time"
                            value={notificationSettings.reminderTime}
                            onChange={(e) => updateSettings('reminderTime', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                )}

                {/* Progress Updates */}
                <div className="flex items-center justify-between py-2">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Progress Updates</h3>
                        <p className="text-sm text-gray-500 mt-1">Weekly summary of your learning progress</p>
                    </div>
                    <ToggleSwitch
                        checked={notificationSettings.progressUpdates}
                        onChange={() => updateSettings('progressUpdates', !notificationSettings.progressUpdates)}
                        ariaLabel="Toggle progress updates"
                    />
                </div>
            </div>
        </div>
    );
};

export default Notifications;
