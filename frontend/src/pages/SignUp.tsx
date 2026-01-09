import "./Auth.css";
import logo from "../pages/orato-logo.jpg";

const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Orato Logo" className="auth-logo" />
        <h2>Create Account</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button>Sign Up</button>

        <div className="auth-footer">
          Already have an account? <a href="/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
