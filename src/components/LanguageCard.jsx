import React, { useState } from 'react';
import { MdTranslate } from 'react-icons/md';

const LanguageCard = () => {
    const [language, setLanguage] = useState('English');

    const languages = [
        { code: 'GB', name: 'English', color: '#3b82f6', bg: '#eff6ff' },
        { code: 'FR', name: 'French', color: '#ef4444', bg: '#fff1f2' }, // Placeholder colors
        { code: 'ES', name: 'Spanish', color: '#f59e0b', bg: '#fffbeb' },
    ];

    const getActiveLang = () => languages.find(l => l.name === language);

    return (
        <div className="custom-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
            <div className="w-100 d-flex align-items-center gap-2 mb-4">
                <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <MdTranslate size={20} />
                </div>
                <h6 className="mb-0 text-secondary fw-bold">Detected Language</h6>
                <div className="flex-grow-1"></div>
            </div>

            <div className="mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm text-dark fw-bold"
                    style={{
                        width: '180px',
                        height: '180px',
                        backgroundColor: '#f0f9ff',
                        fontSize: '4rem'
                    }}>
                    {getActiveLang().code}
                </div>
            </div>

            <div className="mb-4">
                <div className="text-secondary small mb-1">Current Language:</div>
                <h3 className="fw-bold" style={{ color: '#3b82f6' }}>{language}</h3>
            </div>

            <div className="d-flex w-100 justify-content-between px-2 mt-auto gap-2">
                {languages.map((lang) => (
                    <div
                        key={lang.code}
                        onClick={() => setLanguage(lang.name)}
                        className={`flex-grow-1 p-3 rounded-3 d-flex flex-column align-items-center justify-content-center cursor-pointer`}
                        style={{
                            backgroundColor: language === lang.name ? '#dbeafe' : 'transparent',
                            border: language === lang.name ? '2px solid #3b82f6' : '1px solid transparent',
                            cursor: 'pointer'
                        }}
                    >
                        <h5 className="fw-bold mb-1">{lang.code}</h5>
                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>{lang.name}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageCard;
