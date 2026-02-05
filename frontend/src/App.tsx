import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';

export default function Status() {
  const [battery, setBattery] = useState(85);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <Navbar />
    </div>
  );
}