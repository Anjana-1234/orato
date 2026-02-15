import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  // NEW FIELDS - Personal Information
  age: Number,
  nativeLanguage: String,
  targetLanguage: {
    type: String,
    default: "English",
  },
  learningGoal: String,
  dailyGoalMinutes: {
    type: Number,
    default: 15,
  },
  
  // NEW FIELDS - Assessment
  skillLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  assessmentScore: {
    type: Number,
    default: 0,
  },
  assessmentCompleted: {
    type: Boolean,
    default: false,
  },
  
  // Password Reset (already exists)
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);