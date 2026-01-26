import User from "../models/user.js";
import bcrypt from "bcryptjs";

// READ - Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Don't send passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// READ - Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// UPDATE - Update user by ID
export const updateUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Update fields if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) {
      // Hash new password if updating
      user.password = await bcrypt.hash(password, 10);
    }
    
    await user.save();
    
    res.json({ 
      message: "User updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE - Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};