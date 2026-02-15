import mongoose from "mongoose";

/**
 * OTP Schema
 * Stores OTP codes with expiration time
 * Used for password reset verification
 */

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // OTP expires after 10 minutes
    expires: 600 // TTL index - MongoDB will auto-delete after 10 minutes
  }
});

// Index for faster email lookups
otpSchema.index({ email: 1 });

export default mongoose.model("Otp", otpSchema);