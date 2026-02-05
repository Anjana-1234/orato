import React, { useState, useEffect } from 'react';
import { Moon, Smile, Volume2, TrendingUp } from 'lucide-react';

const AppPreferences = () => {
    // Local storage එකෙන් කලින් තිබුණු setting එක ගන්නවා (නැත්නම් false)
    const [preferences, setPreferences] = useState({
        darkMode: localStorage.getItem('theme') === 'dark',
        showEmojis: true,
        voiceOutput: true,
        historyGraph: true,
    });

    // Dark mode change වෙනකොට HTML class එක update කරනවා
    useEffect(() => {
        if (preferences.darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [preferences.darkMode]);

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const settingsItems = [
        {
            id: 'darkMode',
            title: 'Dark Mode',
            desc: 'Enable dark theme',
            icon: Moon,
            active: preferences.darkMode
        },
        {
            id: 'showEmojis',
            title: 'Show Emojis in Feedback',
            desc: 'Display emotion emojis',
            icon: Smile,
            active: preferences.showEmojis
        },
        {
            id: 'voiceOutput',
            title: 'Enable Voice Output',
            desc: 'Robot speaks feedback',
            icon: Volume2,
            active: preferences.voiceOutput
        },
        {
            id: 'historyGraph',
            title: 'Show Emotion History Graph',
            desc: 'Display progress chart',
            icon: TrendingUp,
            active: preferences.historyGraph
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-8">Display Settings</h3>

                <div className="space-y-2">
                    {settingsItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between p-6 rounded-[2rem] transition-all ${index !== settingsItems.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''
                                }`}
                        >
                            <div className="flex items-center gap-5">
                                <div className="text-slate-500 dark:text-slate-400">
                                    <item.icon size={22} strokeWidth={2} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[15px]">{item.title}</h4>
                                    <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                onClick={() => togglePreference(item.id as keyof typeof preferences)}
                                className={`w-14 h-7 rounded-full transition-all duration-300 relative flex items-center px-1 ${item.active ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                                    }`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${item.active ? 'translate-x-7' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppPreferences;