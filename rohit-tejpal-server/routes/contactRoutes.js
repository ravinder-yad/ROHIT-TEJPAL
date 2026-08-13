import express from "express";
import {
  submitMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/contactController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to submit a message
router.post("/", submitMessage);

// Protected admin routes
router.route("/").get(protect, adminAuth, getMessages);
router.route("/:id")
  .put(protect, adminAuth, updateMessageStatus)
  .delete(protect, adminAuth, deleteMessage);

export default router;
