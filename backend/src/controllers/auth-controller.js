import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOtpEmail } from "../services/emailService.js";  // ← Add this

/**
 * SIGNUP - Register new user
 * Returns token for auto-login
 */
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    console.log("Signup request:", { fullName, email });

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required!" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists with this email!" 
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters!" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User created successfully:", newUser.email);

    // Generate JWT token (for auto-login)
    const token = jwt.sign(
      { 
        userId: newUser._id, 
        email: newUser.email 
      },
      process.env.JWT_SECRET || "your-default-secret-key-change-this",
      { expiresIn: "7d" }
    );

    // Return token and user info
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token: token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again." 
    });
  }
};

/**
 * SIGNIN - Login existing user
 */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Signin request:", email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required!" 
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password!" 
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password!" 
      });
    }

    console.log("User logged in successfully:", user.email);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET || "your-default-secret-key-change-this",
      { expiresIn: "7d" }
    );

    // Return token and user info
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token: token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again." 
    });
  }
};

/**
 * FORGOT PASSWORD WITH OTP - Send OTP to email
 */
export const forgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Forgot password OTP request for:", email);

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required!",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      console.log("User not found with email:", email);
      return res.status(404).json({
        success: false,
        message: "No account found with this email address!",
      });
    }

    console.log("User found:", user.email);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP before saving to database
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Save hashed OTP and expiry to user (10 minutes)
    user.resetPasswordToken = otpHash;
    user.resetPasswordExpire = Date.now() + 600000; // 10 minutes
    await user.save();

    console.log("OTP generated for:", user.email);

    // Send OTP email
    try {
      await sendOtpEmail(user.email, otp);
      
      console.log("✅ OTP email sent successfully");

      res.status(200).json({
        success: true,
        message: "OTP has been sent to your email! Valid for 10 minutes.",
      });

    } catch (emailError) {
      // If email fails, remove the OTP
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      console.error("Failed to send OTP email:", emailError);

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again later.",
      });
    }

  } catch (error) {
    console.error("Forgot password OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

/**
 * RESET PASSWORD WITH OTP - Verify OTP and reset password
 */
export const resetPasswordOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    console.log("Reset password OTP request for:", email);

    // Validate input
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and new password are required!",
      });
    }

    // Validate OTP length
    if (otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "OTP must be 6 digits!",
      });
    }

    // Validate password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters!",
      });
    }

    // Hash the OTP to compare with database
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Find user with valid OTP
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      resetPasswordToken: otpHash,
      resetPasswordExpire: { $gt: Date.now() }, // OTP not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP!",
      });
    }

    console.log("Valid OTP found for user:", user.email);

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.log("✅ Password reset successful for:", user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now sign in with your new password.",
    });

  } catch (error) {
    console.error("Reset password OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};