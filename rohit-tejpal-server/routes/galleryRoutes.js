import express from "express";
import { 
  getGalleryImages, 
  addGalleryImage, 
  deleteGalleryImage, 
  updateGalleryImage 
} from "../controllers/galleryController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.route("/")
  .get(getGalleryImages)
  .post(upload.single("image"), addGalleryImage);

router.route("/:id")
  .put(upload.single("image"), updateGalleryImage)
  .delete(deleteGalleryImage);

export default router;
