import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Setting from './pages/Setting';
import AboutUs from './pages/AboutUs';
import Account from './pages/Account';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />  {/* ← ADD THIS */}
          <Route path="/reset-password" element={<ResetPassword />} />    {/* ← ADD THIS */}
          <Route path="/about" element={<AboutUs />} />
          
          {/* Protected Routes - After Login */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/account" element={<Account />} />
          <Route path="/setting" element={<Setting />} />

          {/* 404 Not Found */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <a href="/" className="text-green-600 hover:underline font-semibold">Go to Home</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;