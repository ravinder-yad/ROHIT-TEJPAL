import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Update user profile & photo
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;

      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "rohit_tejpal/users" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
        user.profileImage = uploadResult.secure_url;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        addresses: updatedUser.addresses,
        notifications: updatedUser.notifications,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (await user.matchPassword(req.body.currentPassword)) {
        user.password = req.body.newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
      } else {
        res.status(401).json({ message: 'Incorrect current password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user notifications
// @route   PUT /api/users/notifications
// @access  Private
export const updateUserNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.notifications.orderUpdates = req.body.orderUpdates !== undefined ? req.body.orderUpdates : user.notifications.orderUpdates;
      user.notifications.promoUpdates = req.body.promoUpdates !== undefined ? req.body.promoUpdates : user.notifications.promoUpdates;

      const updatedUser = await user.save();

      res.json({
        notifications: updatedUser.notifications,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new address
// @route   POST /api/users/addresses
// @access  Private
export const addUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const { fullName, phone, houseFlat, streetArea, city, state, pincode, type, isDefault } = req.body;
      
      const newAddress = { fullName, phone, houseFlat, streetArea, city, state, pincode, type, isDefault };

      if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }

      user.addresses.push(newAddress);
      
      // If it's the only address, make it default
      if (user.addresses.length === 1) {
        user.addresses[0].isDefault = true;
      }

      const updatedUser = await user.save();
      res.status(201).json(updatedUser.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an address
// @route   PUT /api/users/addresses/:id
// @access  Private
export const updateUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const address = user.addresses.id(req.params.id);

      if (address) {
        const { fullName, phone, houseFlat, streetArea, city, state, pincode, type, isDefault } = req.body;
        
        address.fullName = fullName || address.fullName;
        address.phone = phone || address.phone;
        address.houseFlat = houseFlat || address.houseFlat;
        address.streetArea = streetArea || address.streetArea;
        address.city = city || address.city;
        address.state = state || address.state;
        address.pincode = pincode || address.pincode;
        address.type = type || address.type;

        if (isDefault) {
          user.addresses.forEach(addr => addr.isDefault = false);
          address.isDefault = true;
        }

        const updatedUser = await user.save();
        res.json(updatedUser.addresses);
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an address
// @route   DELETE /api/users/addresses/:id
// @access  Private
export const deleteUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.addresses = user.addresses.filter(
        (addr) => addr._id.toString() !== req.params.id
      );

      const updatedUser = await user.save();
      res.json(updatedUser.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user cart
// @route   GET /api/users/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user.cart || []);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sync user cart
// @route   PUT /api/users/cart
// @access  Private
export const syncCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.cart = req.body.cartItems || [];
      const updatedUser = await user.save();
      res.json(updatedUser.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user.wishlist || []);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sync user wishlist
// @route   PUT /api/users/wishlist
// @access  Private
export const syncWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.wishlist = req.body.wishlistItems || [];
      const updatedUser = await user.save();
      res.json(updatedUser.wishlist);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
