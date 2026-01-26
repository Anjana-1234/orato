import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../pages/orato-logo.jpg";

// Backend API base URL - UPDATED TO PORT 5001
const API = "http://localhost:5001/api/auth";

export default function SignIn() {
  // State management for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  
  // useNavigate hook to redirect after successful login
  const navigate = useNavigate();

  /**
   * Handle form submission
   * - Sends POST request to backend signin endpoint
   * - Stores JWT token in localStorage
   * - Redirects to dashboard/home on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true); // Show loading state

    try {
      // Send POST request to backend signin endpoint
      const res = await axios.post(`${API}/signin`, {
        email,
        password,
      });

      // Success: Store token and user info
      localStorage.setItem("token", res.data.token); // Store JWT token
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user info
      
      // Show success message
      alert("Login successful!");
      
      // Redirect to home/dashboard page
      // TODO: Update this route to your actual dashboard route
      navigate("/"); // or navigate("/dashboard")
      
    } catch (error: any) {
      // Error handling: Display error message from backend
      console.error("Signin error:", error);
      
      if (error.response) {
        // Backend returned an error response (wrong credentials, etc.)
        alert(error.response.data.message || "Invalid credentials!");
      } else if (error.request) {
        // Request was made but no response received
        alert("Cannot connect to server. Please check if backend is running.");
      } else {
        // Something else went wrong
        alert("Login failed. Please try again.");
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
            alt="Orato Robot"
            className="w-20 h-20 rounded-xl shadow-md"
          />
        </div>

        {/* Title Section */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        {/* Signin Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading} // Disable while loading
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full py-2 rounded-lg text-white font-semibold 
                       bg-gradient-to-r from-blue-500 to-purple-600 
                       hover:opacity-90 transition
                       ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>
        </form>

        {/* Footer - Link to Signup */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}