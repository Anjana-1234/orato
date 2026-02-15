import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user-controller.js";

const router = express.Router();

// READ - Get all users
router.get("/", getAllUsers);

// READ - Get single user by ID
router.get("/:id", getUserById);

// UPDATE - Update user by ID
router.put("/:id", updateUser);

// DELETE - Delete user by ID
router.delete("/:id", deleteUser);

export default router;