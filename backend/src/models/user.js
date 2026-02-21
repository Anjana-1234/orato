import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
    select: false, // hides password automatically
  },

  // Profile Info
  bio: {
    type: String,
    default: "",
  },

  profilePicture: {
    type: String,
    default: "",
  },

  targetLanguage: {
    type: String,
    default: "English",
  },

  // Goals
  goals: [goalSchema],

  // Assessment
  skillLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },

  assessmentScore: {
    type: Number,
    default: 0,
  },

  assessmentCompleted: {
    type: Boolean,
    default: false,
  },

  // Password Reset
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Clean API responses globally
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);