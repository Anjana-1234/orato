import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { time: '0:00', happy: 40, nervous: 24, neutral: 24 },
    { time: '1:00', happy: 30, nervous: 13, neutral: 22 },
    { time: '2:00', happy: 20, nervous: 58, neutral: 22 },
    { time: '3:00', happy: 27, nervous: 39, neutral: 20 },
    { time: '4:00', happy: 18, nervous: 48, neutral: 21 },
    { time: '5:00', happy: 23, nervous: 38, neutral: 25 },
    { time: '6:00', happy: 34, nervous: 43, neutral: 21 },
];

const HistoryChart = () => {
    return (
        <div className="custom-card h-100 p-4">
            <div className="d-flex justify-content-between mb-4">
                <h6 className="fw-bold text-secondary">Emotion History</h6>
                <div className="dropdown">
                    <button className="btn btn-sm btn-light dropdown-toggle text-muted" type="button">
                        Last 4 minutes
                    </button>
                </div>
            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorHappy" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorNervous" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="happy" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHappy)" strokeWidth={2} />
                        <Area type="monotone" dataKey="nervous" stroke="#f97316" fillOpacity={1} fill="url(#colorNervous)" strokeWidth={2} />
                        {/* <Area type="monotone" dataKey="neutral" stroke="#6b7280" fillOpacity={1} fill="url(#colorNeutral)" /> */}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="d-flex justify-content-center gap-4 mt-2">
                <div className="d-flex align-items-center gap-2">
                    <span className="d-inline-block rounded-circle" style={{ width: 8, height: 8, backgroundColor: '#3b82f6' }}></span>
                    <small className="text-muted">Happy</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <span className="d-inline-block rounded-circle" style={{ width: 8, height: 8, backgroundColor: '#f97316' }}></span>
                    <small className="text-muted">Nervous</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <span className="d-inline-block rounded-circle" style={{ width: 8, height: 8, backgroundColor: '#6b7280' }}></span>
                    <small className="text-muted">Neutral</small>
                </div>
            </div>
        </div>
    );
};

export default HistoryChart;
