import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, adminAuth, getDashboardStats);

export default router;
