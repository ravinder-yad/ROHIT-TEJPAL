import express from "express";
import {
  createCollection,
  getCollections,
  getCollectionBySlug,
  updateCollection,
  deleteCollection,
} from "../controllers/collectionController.js";
import { protect, adminAuth as admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getCollections)
  .post(protect, admin, upload.single("image"), createCollection);

router.route("/:slug").get(getCollectionBySlug);

router
  .route("/:id")
  .put(protect, admin, upload.single("image"), updateCollection)
  .delete(protect, admin, deleteCollection);

export default router;
