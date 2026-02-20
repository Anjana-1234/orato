import React, { useState, type ChangeEvent } from 'react';
import { Volume2 } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch.tsx';
import type { PlaybackSpeed, AudioDisplaySettings, AudioDisplayProps } from '../types/settings.types.ts';

// For handles configuration for sound effects, dark mode theme, and audio playback speed.
const AudioDisplay: React.FC<AudioDisplayProps> = ({
    settings,
    onChange
}) => {
    // Component state with values ​​from props or default values.
    const [audioSettings, setAudioSettings] = useState<AudioDisplaySettings>({
        soundEffects: settings?.soundEffects ?? true,
        darkMode: settings?.darkMode ?? false,
        playbackSpeed: settings?.playbackSpeed ?? '1.0x (Normal)'
    });

    // Options for playback speed.
    const playbackOptions: PlaybackSpeed[] = [
        '0.5x (Slow)',
        '0.75x',
        '1.0x (Normal)',
        '1.25x',
        '1.5x',
        '2.0x (Fast)'
    ];

    // For toggles the sound effect setting and notifies the parent component.
    const handleSoundToggle = (): void => {
        const newSettings = {
            ...audioSettings,
            soundEffects: !audioSettings.soundEffects
        };

        setAudioSettings(newSettings);

        if (onChange) {
            onChange(newSettings);
        }

        console.log('Sound effects toggled to:', !audioSettings.soundEffects);
    };

    // For toggles the dark mode setting and notifies the parent component.
    const handleDarkModeToggle = (): void => {
        const newSettings = {
            ...audioSettings,
            darkMode: !audioSettings.darkMode
        };

        setAudioSettings(newSettings);

        if (onChange) {
            onChange(newSettings);
        }

        console.log('Dark mode toggled to:', !audioSettings.darkMode);
    };

    // For updates the playback speed selection and notifies the parent component.
    const handleSpeedChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const newSpeed = e.target.value as PlaybackSpeed;
        const newSettings = {
            ...audioSettings,
            playbackSpeed: newSpeed
        };

        setAudioSettings(newSettings);

        if (onChange) {
            onChange(newSettings);
        }

        console.log('Playback speed changed to:', newSpeed);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            {/* Header section */}
            <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <Volume2 className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Audio & Display</h2>
            </div>

            {/* Settings controls container */}
            <div className="space-y-4">
                {/* Sound Effects toggle */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Sound Effects</h3>
                        <p className="text-sm text-gray-500 mt-1">Play sounds for correct/incorrect answers</p>
                    </div>
                    <ToggleSwitch
                        checked={audioSettings.soundEffects}
                        onChange={handleSoundToggle}
                        ariaLabel="Toggle sound effects"
                    />
                </div>

                {/* Dark Mode toggle */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">Dark Mode</h3>
                        <p className="text-sm text-gray-500 mt-1">Use dark theme for the app</p>
                    </div>
                    <ToggleSwitch
                        checked={audioSettings.darkMode}
                        onChange={handleDarkModeToggle}
                        ariaLabel="Toggle dark mode"
                    />
                </div>

                {/* Audio playback speed dropdown */}
                <div className="pt-3">
                    <label
                        htmlFor="playback-speed"
                        className="block text-base font-medium text-gray-900 mb-3"
                    >
                        Audio Playback Speed
                    </label>
                    <select
                        id="playback-speed"
                        value={audioSettings.playbackSpeed}
                        onChange={handleSpeedChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors cursor-pointer"
                    >
                        {playbackOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AudioDisplay;