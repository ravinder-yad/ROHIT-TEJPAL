import express from "express";
import { createProduct, getProducts, deleteProduct, getProductById, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
// import { protect, admin } from "../middleware/authMiddleware.js"; // if you have auth

const router = express.Router();

// Get all products, optional query: ?category=tunic-set
router.route("/").get(getProducts);

// Create a product (Admin only, handles single image upload in 'image' field)
router.route("/").post(upload.single("image"), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

export default router;
