// Temporary in-memory OTP store
// Format: { email: { otp, expiresAt } }

const otpStore = new Map();

export default otpStore;
