import React, { useState } from 'react';
import { BsEmojiSmile, BsEmojiNeutral, BsEmojiFrown } from 'react-icons/bs';

const EmotionCard = () => {
    const [currentEmotion, setCurrentEmotion] = useState('Nervous');

    const emotions = [
        { name: 'Happy', emoji: '😃', color: '#3b82f6', icon: <BsEmojiSmile /> },
        { name: 'Neutral', emoji: '😐', color: '#6b7280', icon: <BsEmojiNeutral /> },
        { name: 'Nervous', emoji: '😬', color: '#f97316', icon: <BsEmojiFrown /> },
    ];

    const getActiveEmotion = () => emotions.find(e => e.name === currentEmotion);

    return (
        <div className="custom-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
            <div className="w-100 d-flex align-items-center gap-2 mb-4">
                <div className="bg-danger bg-opacity-10 text-danger p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <BsEmojiSmile size={20} />
                </div>
                <h6 className="mb-0 text-secondary fw-bold">Detected Emotion</h6>
                <div className="flex-grow-1"></div>
            </div>

            <div className="mb-4 position-relative">
                <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                    style={{
                        width: '180px',
                        height: '180px',
                        backgroundColor: '#fffbeb', /* Light yellow for emoji bg */
                        fontSize: '6rem'
                    }}>
                    {getActiveEmotion().emoji}
                </div>
            </div>

            <div className="mb-4">
                <div className="text-secondary small mb-1">Current Emotion:</div>
                <h3 className="fw-bold" style={{ color: getActiveEmotion().color }}>{currentEmotion}</h3>
            </div>

            <div className="d-flex gap-3 mt-auto">
                {emotions.map((emotion) => (
                    <div
                        key={emotion.name}
                        onClick={() => setCurrentEmotion(emotion.name)}
                        className={`rounded-3 p-2 d-flex align-items-center justify-content-center cursor-pointer transition-all ${currentEmotion === emotion.name ? 'shadow-sm ring-2 ring-primary' : ''}`}
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: currentEmotion === emotion.name ? '#fff7ed' : 'transparent',
                            cursor: 'pointer',
                            fontSize: '2rem',
                            opacity: currentEmotion === emotion.name ? 1 : 0.5,
                            border: currentEmotion === emotion.name ? `2px solid ${emotion.color}` : '1px solid transparent'
                        }}
                    >
                        {emotion.emoji}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmotionCard;
