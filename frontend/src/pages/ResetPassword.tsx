import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../pages/orato-logo.jpg";

// Backend API base URL
const API = "http://localhost:5001/api/otp";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state (passed from ForgotPassword page)
  const email = location.state?.email || "";

  /**
   * Handle reset password form submission
   * Verifies OTP and updates password
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Validation: Check password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Validation: Check if email exists
    if (!email) {
      alert("Email not found. Please go back to forgot password page.");
      navigate("/forgot-password");
      return;
    }

    setLoading(true);

    try {
      // Send POST request to backend
      const res = await axios.post(`${API}/reset-password`, {
        email,
        otp,
        password
      });

      // Success: Show message and redirect to signin
      alert(res.data.message);
      navigate("/signin");

    } catch (error: any) {
      console.error("Reset password error:", error);
      
      if (error.response) {
        alert(error.response.data.message || "Failed to reset password");
      } else {
        alert("Cannot connect to server. Please check if backend is running.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle resend OTP
   */
  const handleResendOtp = async () => {
    if (!email) {
      alert("Email not found. Please go back to forgot password page.");
      return;
    }

    try {
      const res = await axios.post(`${API}/resend`, { email });
      alert(res.data.message);
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      alert(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Orato Logo"
            className="w-20 h-20 rounded-xl shadow-md"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-2">
          Enter OTP and create a new password
        </p>
        {email && (
          <p className="text-center text-sm text-gray-600 mb-4">
            OTP sent to: <strong>{email}</strong>
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={loading}
            maxLength={6}
            className="w-full px-4 py-2 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="New Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
            className="w-full px-4 py-2 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold
                       bg-gradient-to-r from-blue-500 to-purple-600
                       hover:opacity-90 transition
                       ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-4">
          <button
            onClick={handleResendOtp}
            className="text-sm text-purple-600 hover:underline"
          >
            Didn't receive OTP? Resend
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Back to{" "}
          <Link to="/signin" className="text-purple-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;