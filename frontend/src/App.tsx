import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Language from './components/Language';
import AppPreferences from './components/AppPreferences';
import { Mail, Edit2, Key, User, Bot, Settings } from 'lucide-react';

export default function App() {
  // To track which tab the user is currently viewing
  const [activeTab, setActiveTab] = useState('Account Settings');

  // For handle switching between different setup views
  const renderContent = () => {
    switch (activeTab) {
      case 'Account Settings':
        return (
          <div className="space-y-8">
            {/* Main Profile Card - Shows user avatar and basic info */}
            <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 flex items-center justify-center border-[6px] border-white shadow-xl">
                  <div className="bg-blue-100/20 w-full h-full rounded-full flex items-center justify-center">
                    <User size={48} className="text-white opacity-90" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">John Doe</h3>
                  <div className="flex items-center gap-2 text-slate-400 font-semibold">
                    <Mail size={18} />
                    <span>john.doe@example.com</span>
                  </div>
                </div>
              </div>

              {/* Action buttons for the profile */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95">
                  <Edit2 size={18} /> Edit Profile
                </button>
                <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-8 py-3 rounded-2xl font-bold hover:bg-slate-200">
                  <Key size={18} /> Change Password
                </button>
              </div>
            </div>

            {/* Secondary section for account-specific details */}
            <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-8">Account Information</h3>
              <div className="divide-y divide-slate-50">
                {[
                  { label: 'Member Since', value: 'January 2025' },
                  { label: 'Account Type', value: 'Premium' },
                  { label: 'Training Sessions', value: '47 sessions' }
                ].map((info) => (
                  <div key={info.label} className="flex justify-between items-center py-6">
                    <span className="text-slate-400 font-bold">{info.label}</span>
                    <span className="font-bold text-slate-700">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Language & Region':
        return <Language />;

      case 'App Preferences':
        return <AppPreferences />;

      // built yet
      default:
        return (
          <div className="bg-white rounded-[2.5rem] p-20 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-slate-50 p-6 rounded-full">
              <Settings className="w-12 h-12 text-slate-300 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{activeTab}</h3>
              <p className="text-slate-500 mt-2">This module is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col antialiased">
      {/* Top navigation bar */}
      <Navbar />

      <main className="max-w-[1400px] mx-auto w-full px-12 py-10 flex gap-12">
        {/* Left Sidebar - Contains the page title and navigation links */}
        <div className="shrink-0 space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg">
                <Bot className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
            </div>
            <p className="text-slate-500 text-sm ml-12">Manage account & app preferences</p>
          </div>

          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Right Content Area - Displays the selected tab's content */}
        <div className="flex-1 space-y-8">
          <h2 className="text-lg font-bold text-slate-700 ml-2">{activeTab}</h2>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}