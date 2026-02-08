import React, { useState } from 'react';

const QuickSettings = () => {
    const [settings, setSettings] = useState({
        audio: true,
        realtime: true,
        notifications: false
    });

    const toggle = (key) => setSettings({ ...settings, [key]: !settings[key] });

    return (
        <div className="custom-card p-4 h-100">
            <h6 className="text-secondary fw-bold mb-4">Quick Settings</h6>

            <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-dark fw-medium">Audio Feedback</span>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={settings.audio}
                            onChange={() => toggle('audio')}
                            style={{ cursor: 'pointer', width: '3em', height: '1.5em' }}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-dark fw-medium">Real-time Analysis</span>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={settings.realtime}
                            onChange={() => toggle('realtime')}
                            style={{ cursor: 'pointer', width: '3em', height: '1.5em' }}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-dark fw-medium">Notifications</span>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={() => toggle('notifications')}
                            style={{ cursor: 'pointer', width: '3em', height: '1.5em' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickSettings;
