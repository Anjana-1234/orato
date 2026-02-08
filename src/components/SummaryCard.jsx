import React from 'react';
import { FiClock, FiTarget, FiActivity } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const SummaryCard = () => {
    return (
        <div className="custom-card p-4 h-100">
            <h6 className="card-title d-flex align-items-center gap-2 mb-4">
                <FiActivity className="text-primary" /> Today's Summary
            </h6>

            <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                    <div className="p-3 rounded-2 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: '#e0f2fe', color: '#0ea5e9' }}>
                        <FiClock size={20} />
                    </div>
                    <div>
                        <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Practice Time</small>
                        <strong className="text-dark" style={{ fontSize: '1rem' }}>45 minutes</strong>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <div className="p-3 rounded-2 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: '#f3e8ff', color: '#a855f7' }}>
                        <FiTarget size={20} />
                    </div>
                    <div>
                        <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Sessions</small>
                        <strong className="text-dark" style={{ fontSize: '1rem' }}>3 completed</strong>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <div className="p-3 rounded-2 d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
                        <FaFire size={20} />
                    </div>
                    <div>
                        <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Streak</small>
                        <strong className="text-danger" style={{ fontSize: '1rem' }}>7 days 🔥</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
