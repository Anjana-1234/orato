import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ProfileCard = () => {
    return (
        <div className="custom-card p-4 d-flex flex-column align-items-center justify-content-center text-center h-100">
            <div className="mb-3 position-relative">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{ width: '80px', height: '80px', fontSize: '3rem' }}>
                    <FaUserCircle />
                </div>
                <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1" style={{ width: '20px', height: '20px' }}></span>
            </div>

            <h5 className="fw-bold mb-1">John Doe</h5>
            <p className="text-secondary small mb-4">Student</p>

            <div className="w-100 mt-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-secondary fw-bold">Overall Progress</small>
                    <small className="text-primary fw-bold">70%</small>
                </div>
                <div className="progress" style={{ height: '8px', borderRadius: '4px', backgroundColor: '#eef2ff' }}>
                    <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '70%', borderRadius: '4px' }}
                        aria-valuenow="70"
                        aria-valuemin="0"
                        aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
