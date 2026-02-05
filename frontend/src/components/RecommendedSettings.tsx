
import { Volume2, TrendingUp, Eye, Bell } from 'lucide-react';

const RecommendedSettings = () => {
    const recommendations = [
        {
            title: 'Enable Voice Feedback',
            desc: 'Get audio guidance during training for better real-time feedback',
            icon: Volume2,
            color: 'blue',
            bgColor: 'bg-blue-50/50',
            iconBg: 'bg-blue-600',
            btnBg: 'bg-blue-600'
        },
        {
            title: 'Turn on Emotion History',
            desc: 'Track your emotional progress over time to see improvement',
            icon: TrendingUp,
            color: 'purple',
            bgColor: 'bg-purple-50/50',
            iconBg: 'bg-purple-600',
            btnBg: 'bg-purple-600'
        },
        {
            title: 'Activate Eye-Contact Alerts',
            desc: 'Get advanced training with eye-contact detection and alerts',
            icon: Eye,
            color: 'green',
            bgColor: 'bg-green-50/50',
            iconBg: 'bg-green-600',
            btnBg: 'bg-green-600'
        },
        {
            title: 'Weekly Progress Reports',
            desc: 'Receive detailed weekly summaries of your presentation skills',
            icon: Bell,
            color: 'orange',
            bgColor: 'bg-orange-50/50',
            iconBg: 'bg-orange-600',
            btnBg: 'bg-orange-600'
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-2">
                <p className="text-slate-500 font-medium text-sm">Based on your usage, we recommend these settings to enhance your experience</p>
            </div>

            <div className="grid gap-5">
                {recommendations.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.bgColor} rounded-[2rem] p-8 flex items-start justify-between border border-white/50 shadow-sm transition-all hover:scale-[1.01]`}
                    >
                        <div className="flex gap-6">
                            <div className={`${item.iconBg} p-3 rounded-xl shadow-lg shadow-black/5`}>
                                <item.icon className="text-white w-6 h-6" />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                                    <p className="text-slate-500 font-medium text-[15px] max-w-md leading-relaxed">{item.desc}</p>
                                </div>
                                <button className={`${item.btnBg} text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-black/10 active:scale-95 transition-transform`}>
                                    Enable Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedSettings;