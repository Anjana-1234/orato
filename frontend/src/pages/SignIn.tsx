import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignIn.css";
import logo from "../pages/orato-logo.jpg";


const API = "http://localhost:5000/api/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post(`${API}/signin`, {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    alert("Login successful");
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
      <img src={logo} alt="Orato Robot" className="logo" />

      <h2>Welcome Back</h2>
      <p className="subtitle">Sign in to continue</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          Sign In →
        </button>
      </form>

      <p className="switch">
        Don’t have an account? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  </div>
);

}
