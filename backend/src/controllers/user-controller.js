import User from "../models/user.js";
import bcrypt from "bcryptjs";


/* =====================================================
   ADMIN CRUD (OPTIONAL - can keep for admin use)
===================================================== */

// READ - Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
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

// UPDATE - Update user by ID (admin only)
export const updateUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
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

/* =====================================================
   AUTHENTICATED USER ROUTES (MAIN FEATURES)
===================================================== */

// ✅ Get logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, targetLanguage, bio } = req.body;

    const user = req.user; // <-- use existing user

    if (fullName) user.fullName = fullName;
    if (targetLanguage) user.targetLanguage = targetLanguage;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// ✅ Add learning goal
export const addGoal = async (req, res) => {
  try {
    const { title, targetDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Goal title is required" });
    }

    const user = await User.findById(req.user.userId);

    user.goals.push({
      title,
      targetDate: targetDate ? new Date(targetDate) : null,
    });

    await user.save();

    res.status(201).json({ message: "Goal added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add goal" });
  }
};

// ✅ Get logged-in user's goals
export const getGoals = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    res.json(user.goals || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch goals" });
  }
};