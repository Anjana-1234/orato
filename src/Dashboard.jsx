import React from 'react';
import Navbar from './Navbar';
import EmotionCard from './components/EmotionCard';
import LanguageCard from './components/LanguageCard';
import ProfileCard from './components/ProfileCard';
import SummaryCard from './components/SummaryCard';
import HistoryChart from './components/HistoryChart';
import SpeechScore from './components/SpeechScore';
import QuickSettings from './components/QuickSettings';
import SystemStatus from './components/SystemStatus';

const Dashboard = () => {
    return (
        <div className="min-vh-100 bg-light">
            <Navbar />

            <div className="container-fluid px-4">
                <div className="row g-4">

                    {/* Main Content Column */}
                    <div className="col-lg-9">
                        {/* Top Row: Emotion & Language */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <EmotionCard />
                            </div>
                            <div className="col-md-6">
                                <LanguageCard />
                            </div>
                        </div>

                        {/* Middle Row: History Chart */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <HistoryChart />
                            </div>
                        </div>

                        {/* Bottom Row: Speech Score */}
                        <div className="row">
                            <div className="col-md-5">
                                <SpeechScore />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="col-lg-3">
                        <div className="d-flex flex-column gap-4">
                            <ProfileCard />
                            <SummaryCard />
                            <QuickSettings />
                            <SystemStatus />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
