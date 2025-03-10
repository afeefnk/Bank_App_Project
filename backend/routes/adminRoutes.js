import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserByRole, getUserByUsername, getUserCount } from "../controllers/adminController.js";

const router = express.Router();

// Get user count (admin)
router.get("/count", authMiddleware, getUserCount);

// Route to get users by role
router.get("/users", authMiddleware, getUserByRole);

// Route to get userdetails by username
router.get('/user/:username',authMiddleware,getUserByUsername)
export default router; 