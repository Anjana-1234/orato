import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} from "../controllers/user-controller.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* ================= AUTHENTICATED USER ================= */

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

/* ================= ADMIN CRUD ================= */

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post(
  "/upload-profile-picture",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Upload failed" });
          }

          // 🔥 THIS IS THE NEW PART
          req.user.profilePicture = result.secure_url;
          await req.user.save();

          res.json({
            message: "Profile picture updated",
            profilePicture: result.secure_url,
          });
        }
      );

      stream.end(req.file.buffer);

    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;