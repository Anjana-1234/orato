import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import otpRoutes from "./routes/otpRoutes.js";
import userRoutes from "./routes/user-routes.js";
import assessmentRoutes from "./routes/assessment-routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import { verifyEmailConfig } from "./services/emailService.js";

// Load env variables FIRST
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Connect DB
connectDB();

// SendEmail
verifyEmailConfig();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/settings", settingsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Orato Backend Running");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
