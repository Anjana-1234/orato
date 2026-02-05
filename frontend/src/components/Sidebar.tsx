import { User, Globe, LayoutGrid, Bell, Shield, Settings, LogOut, Users } from 'lucide-react';

/**
 * Props for the Sidebar component
 */
interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

/**
 * Sidebar component for navigation within the settings dashboard
 */
export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    // Configuration for the main navigation items
    const menuItems = [
        { name: 'Account Settings', icon: User },
        { name: 'Language & Region', icon: Globe },
        { name: 'App Preferences', icon: LayoutGrid },
        { name: 'Notifications', icon: Bell },
        { name: 'Security & Privacy', icon: Shield },
        { name: 'Recommended Settings', icon: Settings },
    ];

    return (
        <aside className="w-72 bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 flex flex-col h-fit">
            {/* Main Navigation Menu */}
            <div className="space-y-1 mb-6">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 ${activeTab === item.name
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200'
                            : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        <item.icon size={20} strokeWidth={activeTab === item.name ? 2.5 : 2} />
                        <span className="font-semibold text-[14px]">{item.name}</span>
                    </button>
                ))}
            </div>

            {/* Bottom Actions Section */}
            <div className="pt-6 border-t border-slate-100 space-y-1">
                {/* Logout Action */}
                <button className="w-full flex items-center gap-4 px-5 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-[14px]">
                    <LogOut size={20} /> Logout
                </button>

                {/* Account Switching Action */}
                <button className="w-full flex items-center gap-4 px-5 py-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-all font-bold text-[14px]">
                    <Users size={20} /> Switch Account
                </button>
            </div>
        </aside>
    );
}