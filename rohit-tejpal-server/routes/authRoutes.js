import express from 'express';
import {
  registerUser,
  loginUser,
  verifyOTP,
  forgotPassword,
  resetPassword,
  loginAdmin,
  registerAdmin,
  logout,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  updateAdminProfile,
  updateAdminPassword
} from '../controllers/authController.js';
import { protect, adminAuth } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Customer Auth
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Admin Auth
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.post('/admin/forgot-password', forgotPasswordAdmin);
router.post('/admin/reset-password/:token', resetPasswordAdmin);
router.put('/admin/profile', protect, adminAuth, (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(500).json({ message: err.message });
    }
    next();
  });
}, updateAdminProfile);
router.put('/admin/password', protect, adminAuth, updateAdminPassword);

// General Logout
router.post('/logout', logout);

export default router;
