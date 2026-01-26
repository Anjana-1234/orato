import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../pages/orato-logo.jpg";

// Backend API base URL - UPDATE PORT TO 5001
const API = "http://localhost:5001/api/auth";

const SignUp = () => {
  // State management for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for better UX
  
  // useNavigate hook to redirect after successful signup
  const navigate = useNavigate();

  /**
   * Handle form submission
   * - Validates passwords match
   * - Sends POST request to backend
   * - Redirects to signin on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Validation: Check password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    setLoading(true); // Show loading state

    try {
      // Send POST request to backend signup endpoint
      const res = await axios.post(`${API}/signup`, {
        fullName,
        email,
        password,
      });

      // Success: Show message and redirect to signin
      alert(res.data.message || "Account created successfully!");
      navigate("/signin"); // Redirect to signin page
      
    } catch (error: any) {
      // Error handling: Display error message from backend
      console.error("Signup error:", error);
      
      if (error.response) {
        // Backend returned an error response
        alert(error.response.data.message || "Signup failed!");
      } else if (error.request) {
        // Request was made but no response received
        alert("Cannot connect to server. Please check if backend is running.");
      } else {
        // Something else went wrong
        alert("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Orato Logo"
            className="w-20 h-20 rounded-xl shadow-md"
          />
        </div>

        {/* Title Section */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join Orato Robot today
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={loading} // Disable while loading
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={loading}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            minLength={6}
            disabled={loading}
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={loading}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full py-2 rounded-lg text-white font-semibold
                       bg-gradient-to-r from-blue-500 to-purple-600
                       hover:opacity-90 transition
                       ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer - Link to Signin */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;