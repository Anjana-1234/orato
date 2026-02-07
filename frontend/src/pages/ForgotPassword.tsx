import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../pages/orato-logo.jpg";

// Backend API base URL
const API = "http://localhost:5001/api/otp";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handle forgot password form submission
   * Sends OTP to user's email
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Send POST request to backend
      const res = await axios.post(`${API}/forgot-password`, { email });

      // Success: Show message and redirect to reset password page
      alert(res.data.message);
      
      // Pass email to reset password page
      navigate("/reset-password", { state: { email } });

    } catch (error: any) {
      console.error("Forgot password error:", error);
      
      if (error.response) {
        alert(error.response.data.message || "Failed to send OTP");
      } else {
        alert("Cannot connect to server. Please check if backend is running.");
      }
    } finally {
      setLoading(false);
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
          Forgot Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive an OTP
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <Link to="/signin" className="text-purple-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;