import React from 'react';
import { Globe } from 'lucide-react';
import type { LanguagePreferencesProps } from '../types/settings.types';

/**
* This component displays the language settings section in the user settings interface.
* The application is limited to English only.
 */
const LanguagePreferences: React.FC<LanguagePreferencesProps> = () => {
    return (
        // The nature of the main card container
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
                <div className="bg-teal-100 rounded-full p-3 mr-4">
                    <Globe className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Language Preferences</h2>
            </div>

            <div>
                <label
                    htmlFor="app-language"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    App Language
                </label>

                {/* Hardcoded to "English" as it is the only supported option. */}
                <select
                    id="app-language"
                    value="English"
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed appearance-none"
                >
                    <option value="English">English</option>
                </select>

                <p className="mt-2 text-sm text-gray-500">
                    ORATO is currently available in English only.
                </p>
            </div>
        </div>
    );
};

export default LanguagePreferences;