import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error: any) {
      console.error("Signin error:", error);

      if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials!");
      } else {
        toast.error("Cannot connect to server.");
      }

    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Orato Logo"
            className="w-20 h-20 rounded-xl shadow-md"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue your learning journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold 
                       bg-gradient-to-r from-green-500 to-green-600
                       ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}