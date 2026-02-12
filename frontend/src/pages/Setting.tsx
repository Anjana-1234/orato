import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LanguagePreferences from '../components/Languagepreferences'; // For importing Language Preferences component.
import Notifications from '../components/Notifications'; // For importing Notifications component.
import AudioDisplay from '../components/AudioDisplay'; // For importing Audio Display component.



const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Customize your learning experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          <LanguagePreferences />
          <Notifications />
          <AudioDisplay />
        </div>
      </div>
    </div>
  );
};
const Setting: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Navbar isLoggedIn={true} />

      <main className="page-container">
        <Settings />
      </main>

      <Footer />
    </div>
  );
};

export default Setting;