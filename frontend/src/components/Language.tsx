import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';


const Language = () => {
    // State to track the currently selected language code
    const [selectedLang, setSelectedLang] = useState('LK');

    // List of available languages for the application
    const languages = [
        { code: 'LK', name: 'Sinhala' },
        { code: 'GB', name: 'English' },
        { code: 'FR', name: 'French' },
        { code: 'ES', name: 'Spanish' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* App Language Selection Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-2">App Language</h3>
                <p className="text-slate-400 font-medium mb-8">Select your preferred language for the application</p>

                <div className="space-y-4">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => setSelectedLang(lang.code)}
                            className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all cursor-pointer ${selectedLang === lang.code
                                ? 'border-blue-600 bg-blue-50/10'
                                : 'border-slate-50 bg-slate-50/30 hover:border-slate-200'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-slate-900">{lang.code}</span>
                                <span className="font-semibold text-slate-700">{lang.name}</span>
                            </div>
                            {/* Show checkmark icon if the language is selected */}
                            {selectedLang === lang.code && <CheckCircle2 className="text-blue-600 w-6 h-6" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Region & Timezone Card */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-8">Region & Timezone</h3>

                <div className="space-y-6">
                    {/* Region Selection Dropdown */}
                    <div className="space-y-2">
                        <label className="text-slate-500 font-bold ml-1">Region</label>
                        <select className="w-full p-4 bg-white border-2 border-slate-50 rounded-2xl font-semibold text-slate-700 focus:outline-none focus:border-blue-600 transition-all appearance-none shadow-sm shadow-slate-50">
                            <option>Sri Lanka</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>France</option>
                            <option>Germany</option>
                            <option>Spain</option>
                        </select>
                    </div>

                    {/* Timezone Selection Dropdown */}
                    <div className="space-y-2">
                        <label className="text-slate-500 font-bold ml-1 flex items-center gap-2">
                            Timezone
                        </label>
                        <select className="w-full p-4 bg-white border-2 border-slate-50 rounded-2xl font-semibold text-slate-700 focus:outline-none focus:border-blue-600 transition-all appearance-none shadow-sm shadow-slate-50">
                            <option>IST (Colombo)</option>
                            <option>GMT (London)</option>
                            <option>PST (Los Angeles)</option>
                            <option>EST (New York)</option>
                            <option>CET (Paris)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Language;