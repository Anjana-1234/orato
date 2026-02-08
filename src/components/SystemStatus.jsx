import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

const SystemStatus = () => {
    return (
        <div className="card border-0 shadow-sm text-white text-center p-3"
            style={{ backgroundColor: '#10b981', borderRadius: '15px' }}>
            <h6 className="mb-2 opacity-75">System Status</h6>
            <div className="d-flex align-items-center justify-content-center gap-2">
                <BsCheckCircleFill className="fs-5" />
                <span className="fw-bold fs-5">Ready to Train</span>
            </div>
        </div>
    );
};

export default SystemStatus;
