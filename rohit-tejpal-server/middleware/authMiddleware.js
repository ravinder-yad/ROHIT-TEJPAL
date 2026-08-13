import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

// Protect routes
const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

      if (decoded.role === 'admin') {
        req.admin = await Admin.findById(decoded.userId).select('-password');
      } else {
        req.user = await User.findById(decoded.userId).select('-password');
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware
const adminAuth = (req, res, next) => {
  if (req.admin && req.admin.isActive) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, adminAuth };
