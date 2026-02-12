import User from "../models/user.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendOtpEmail } from "../services/emailService.js";

/**
 * Generate and send OTP for password reset
 * POST /api/otp/forgot-password
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation: Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists with this email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Security: Don't reveal if email exists or not
      // Send success response anyway to prevent email enumeration
      return res.status(200).json({ 
        message: "If that email exists, an OTP has been sent" 
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Delete any existing OTP for this email
    await Otp.deleteMany({ email: email.toLowerCase() });

    // Save new OTP to database
    await Otp.create({
      email: email.toLowerCase(),
      otp: otp
    });

    
    // SEND EMAIL
   
    try {
      await sendOtpEmail(email, otp);
      console.log(`📧 OTP sent via email to: ${email}`);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      // Fallback: show in console if email fails
      console.log("\n" + "=".repeat(50));
      console.log("📧 OTP EMAIL (Fallback - Email Failed)");
      console.log("=".repeat(50));
      console.log(`To: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log(`Expires in: 10 minutes`);
      console.log("=".repeat(50) + "\n");
    }

    res.status(200).json({ 
      message: "OTP has been sent to your email"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Verify OTP and reset password
 * POST /api/otp/reset-password
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    // Validation: Check all required fields
    if (!email || !otp || !password) {
      return res.status(400).json({ 
        message: "Email, OTP, and new password are required" 
      });
    }

    // Validation: Password strength
    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters" 
      });
    }

    // Find OTP record
    const otpRecord = await Otp.findOne({ 
      email: email.toLowerCase(),
      otp: otp 
    });

    if (!otpRecord) {
      return res.status(400).json({ 
        message: "Invalid or expired OTP" 
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Delete used OTP
    await Otp.deleteOne({ _id: otpRecord._id });

    console.log(`✅ Password reset successful for: ${email}`);

    res.status(200).json({ 
      message: "Password reset successfully. You can now login with your new password." 
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Resend OTP
 * POST /api/otp/resend
 */
export const resendOtp = async (req, res) => { 
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(200).json({ 
        message: "If that email exists, an OTP has been sent" 
      });
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Delete old OTP and create new one
    await Otp.deleteMany({ email: email.toLowerCase() });
    await Otp.create({
      email: email.toLowerCase(),
      otp: otp
    });

    // Send email
    try {
      await sendOtpEmail(email, otp);
      console.log(`📧 OTP resent via email to: ${email}`);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
      // Fallback: show in console
      console.log("\n" + "=".repeat(50));
      console.log("📧 RESEND OTP (Fallback - Email Failed)");
      console.log("=".repeat(50));
      console.log(`To: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log(`Expires in: 10 minutes`);
      console.log("=".repeat(50) + "\n");
    }

    res.status(200).json({ 
      message: "New OTP has been sent"
    });

  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};