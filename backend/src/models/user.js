import mongoose from "mongoose";

// THIS DEFINES WHAT DATA IS STORED FOR EACH USER
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },  // User's name
  email: { type: String, required: true, unique: true },  // Email (must be unique)
  password: { type: String, required: true }  // Hashed password
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

export default mongoose.model("user", userSchema);
