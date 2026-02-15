import express from "express";
import { 
  signup, 
  signin, 
  forgotPasswordOtp,      
  resetPasswordOtp        
} from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// OTP-based password reset
router.post("/forgot-password-otp", forgotPasswordOtp);  
router.post("/reset-password-otp", resetPasswordOtp);    

export default router;