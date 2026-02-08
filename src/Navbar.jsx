import React from 'react';
import { IoHomeOutline, IoTimeOutline, IoSettingsOutline, IoInformationCircleOutline, IoPersonOutline } from 'react-icons/io5';
import { FaChartBar } from 'react-icons/fa'; // Logo icon placeholder

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 px-4 shadow-sm mb-4">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center gap-2" href="#">
                    <div className="bg-primary text-white rounded p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <FaChartBar size={18} />
                    </div>
                    <span className="fw-bold" style={{ color: '#3b3b98', fontSize: '1.25rem' }}>ORATO</span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <ul className="navbar-nav gap-4 align-items-center">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 active" href="#">
                                <IoHomeOutline size={20} /> Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <IoTimeOutline size={20} /> History
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <IoSettingsOutline size={20} /> Settings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <IoInformationCircleOutline size={20} /> About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <IoPersonOutline size={20} /> Account
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
