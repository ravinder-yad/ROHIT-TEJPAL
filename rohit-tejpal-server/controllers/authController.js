import User from '../models/User.js';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import cloudinary from '../config/cloudinary.js';
import sendEmail from '../utils/sendEmail.js';
import { getOtpEmailTemplate } from '../utils/emailTemplates.js';

// Helper to generate 6 digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// @desc    Register a new customer & send OTP
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res.status(400).json({ message: 'User already exists and is verified' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    if (user) {
      // User exists but unverified, update their details
      user.name = name;
      user.password = password;
      user.phone = phone;
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password,
        phone,
        otp,
        otpExpires,
      });
    }
    
    // Send OTP via Email
    const emailSent = await sendEmail({
      email: user.email,
      subject: 'Verify your Rohit Tejpal Account',
      html: getOtpEmailTemplate(user.name, otp, 'register'),
    });

    if (emailSent) {
      res.status(200).json({ message: 'OTP sent to email', email: user.email });
    } else {
      res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth customer & get token (Login Phase 1 - Send OTP)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your account first.' });
      }

      const otp = generateOTP();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
      await user.save();

      const emailSent = await sendEmail({
        email: user.email,
        subject: 'Login OTP for Rohit Tejpal',
        html: getOtpEmailTemplate(user.name, otp, 'login'),
      });

      if (emailSent) {
        res.status(200).json({ message: 'OTP sent to email', email: user.email });
      } else {
        res.status(500).json({ message: 'Failed to send OTP email' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP for Login/Register
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Verify user and clear OTP
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    generateToken(res, user._id, 'user');
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      addresses: user.addresses,
      cart: user.cart,
      wishlist: user.wishlist,
      notifications: user.notifications,
      isVerified: user.isVerified
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account with that email exists' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const emailSent = await sendEmail({
      email: user.email,
      subject: 'Password Reset OTP',
      html: getOtpEmailTemplate(user.name, otp, 'forgotPassword'),
    });

    if (emailSent) {
      res.status(200).json({ message: 'OTP sent to email', email: user.email });
    } else {
      res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Auth admin & get token (Login Phase 1 - Send OTP)
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin email' });
    }

    if (!admin.isActive) {
      return res.status(401).json({ message: 'Admin account is deactivated' });
    }

    const otp = "123456"; // Temporary fixed OTP because Render free tier blocks outbound SMTP
    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    await admin.save();

    // Bypass sendEmail to avoid hanging on Render free tier
    res.status(200).json({ message: 'OTP is 123456 (Render free tier fix)', email: admin.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new Admin (One-time setup - Phase 1 Send OTP)
// @route   POST /api/auth/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Temporarily create admin but they still need to verify OTP to login later.
    // Or we can just create them and send OTP so they can immediately verify.
    const admin = await Admin.create({
      name,
      email,
      isActive: true,
    });

    const otp = generateOTP();
    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await admin.save();

    const emailSent = await sendEmail({
      email: admin.email,
      subject: 'Admin Account Created - Verify OTP',
      html: getOtpEmailTemplate(admin.name, otp, 'adminRegister'),
    });

    if (emailSent) {
      res.status(200).json({ message: 'OTP sent to email', email: admin.email });
    } else {
      res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP for Admin Login/Register
// @route   POST /api/auth/admin/verify-otp
// @access  Public
const verifyAdminOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (admin.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Verify admin and clear OTP
    admin.otp = null;
    admin.otpExpires = null;
    await admin.save();

    generateToken(res, admin._id, 'admin');
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      avatar: admin.avatar,
      role: 'admin',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout user/admin / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Update admin profile
// @route   PUT /api/auth/admin/profile
// @access  Private/Admin
const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      admin.name = req.body.name || admin.name;
      admin.email = req.body.email || admin.email;

      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "rohit_tejpal/admin" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
        admin.avatar = uploadResult.secure_url;
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        avatar: updatedAdmin.avatar,
        role: 'admin',
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

export { 
  registerUser, 
  loginUser, 
  verifyOTP,
  forgotPassword,
  resetPassword,
  loginAdmin, 
  registerAdmin, 
  verifyAdminOTP,
  logout,
  updateAdminProfile
};
