import express from 'express';
import {
  updateUserProfile,
  updateUserPassword,
  updateUserNotifications,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  getCart,
  syncCart,
  getWishlist,
  syncWishlist
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.put('/profile', protect, upload.single('profileImage'), updateUserProfile);
router.put('/password', protect, updateUserPassword);
router.put('/notifications', protect, updateUserNotifications);

router.post('/addresses', protect, addUserAddress);
router.put('/addresses/:id', protect, updateUserAddress);
router.delete('/addresses/:id', protect, deleteUserAddress);

router.get('/cart', protect, getCart);
router.put('/cart', protect, syncCart);

router.get('/wishlist', protect, getWishlist);
router.put('/wishlist', protect, syncWishlist);

export default router;
