import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

const SpeechScore = () => {
    const percentage = 70;

    return (
        <div className="custom-card h-100 p-4 d-flex flex-column align-items-center text-center">
            <div className="w-100 mb-4 text-start">
                <h6 className="text-secondary fw-bold">Speech Score</h6>
            </div>

            <div className="position-relative d-flex align-items-center justify-content-center mb-4"
                style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    background: `conic-gradient(#f97316 ${percentage}%, #e5e7eb ${percentage}% 100%)`
                }}>
                <div className="bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
                    style={{ width: '130px', height: '130px' }}>
                    <h1 className="fw-bold mb-0 text-dark display-4">{percentage}</h1>
                    <small className="text-muted">out of 100</small>
                </div>
            </div>

            <div className="mt-2">
                <h5 className="text-warning fw-bold mb-1">Good Job! Keep Improving 💪</h5>
            </div>
        </div>
    );
};

export default SpeechScore;
