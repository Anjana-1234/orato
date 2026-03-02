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
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    //  NOT required anymore (Google users won't have password)
    required: false,
  },

  // ===== NEW: GOOGLE OAUTH FIELDS =====
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values, only enforces uniqueness when value exists
  },

  profilePicture: {
    type: String,
    default: "",
  },

  //  NEW: Track how user signed up
  authProvider: {
    type: String,
    enum: ['local', 'google'], // 'local' = email/password, 'google' = Google OAuth
    default: 'local',
  },

  // Personal Info (from registration)
  age: {
    type: Number,
  },

  nativeLanguage: {
    type: String,
    default: "Sinhala",
  },

  targetLanguage: {
    type: String,
    default: "English",
  },

  learningGoal: {
    type: String,
    enum: ["career", "travel", "education", "personal"],
    default: "personal",
  },

  dailyGoalMinutes: {
    type: Number,
    default: 15,
  },

  // Profile Info
  bio: {
    type: String,
    default: "",
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

  // Password Reset (only for local auth users)
  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpire: {
    type: Date,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Clean API responses globally - remove password from all queries
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpire;
    return ret;
  },
});

// Also hide sensitive fields in toObject
userSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpire;
    return ret;
  },
});

// Create indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ createdAt: -1 });

export default mongoose.models.User || mongoose.model("User", userSchema);