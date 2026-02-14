import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const API = "http://localhost:5001/api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0); // Cooldown timer
  const [otpSent, setOtpSent] = useState(false); // Track if OTP was sent
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${API}/forgot-password-otp`, { email });
      
      setMessage(res.data.message || "OTP sent to your email!");
      setOtpSent(true);
      setCooldown(60); // 60 second cooldown before allowing resend
      
    } catch (error: any) {
      console.error("Forgot password error:", error);
      if (error.response) {
        setError(error.response.data.message || "Email not found!");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    navigate(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Orato Logo" className="w-20 h-20 rounded-xl shadow-md" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive a 6-digit OTP code
        </p>

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-4 bg-green-100 border-2 border-green-400 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-green-600 text-2xl">✅</div>
              <div className="flex-1">
                <p className="font-semibold text-green-800">{message}</p>
                <p className="text-sm text-green-700 mt-1">
                  Please check your email and enter the OTP code.
                </p>
                {cooldown > 0 && (
                  <p className="text-xs text-green-600 mt-2">
                    You can request a new OTP in {cooldown} seconds
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-red-600 text-2xl">❌</div>
              <div className="flex-1">
                <p className="font-semibold text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || cooldown > 0}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className={`w-full py-3 rounded-lg text-white font-semibold 
                       bg-gradient-to-r from-green-500 to-emerald-600 
                       hover:from-green-600 hover:to-emerald-700
                       transition-all duration-200 shadow-md hover:shadow-lg
                       ${(loading || cooldown > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Sending OTP...
              </span>
            ) : cooldown > 0 ? (
              `Resend in ${cooldown}s`
            ) : otpSent ? (
              "Resend OTP"
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        {/* Proceed Button - Show after OTP sent */}
        {otpSent && (
          <button
            onClick={handleProceed}
            className="w-full mt-4 py-3 rounded-lg text-green-600 font-semibold border-2 border-green-600 hover:bg-green-50 transition-all duration-200"
          >
            I have received the OTP →
          </button>
        )}

        {/* Back to Sign In */}
        <div className="mt-6 text-center">
          <Link
            to="/signin"
            className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;