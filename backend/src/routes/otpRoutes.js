import express from "express";
import { 
  forgotPassword, 
  resetPassword,
  resendOtp 
} from "../controllers/otpController.js";

const router = express.Router();


// FORGOT PASSWORD ROUTES

/**
 * POST /api/otp/forgot-password
 * Send OTP to user's email for password reset
 * Body: { email }
 */
router.post("/forgot-password", forgotPassword);

/**
 * POST /api/otp/reset-password
 * Verify OTP and reset user password
 * Body: { email, otp, password }
 */
router.post("/reset-password", resetPassword);

/**
 * POST /api/otp/resend
 * Resend OTP to user's email
 * Body: { email }
 */
router.post("/resend", resendOtp);

// ============================================
// OLD ROUTES (commented out - can delete later)
// ============================================
// router.post("/send-otp", sendOTP);
// router.post("/verify-otp", verifyOTP);

export default router;