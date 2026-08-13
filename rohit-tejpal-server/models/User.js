import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    profileImage: {
      type: String,
      default: '',
    },
    notifications: {
      orderUpdates: { type: Boolean, default: true },
      promoUpdates: { type: Boolean, default: false }
    },
    addresses: [
      {
        fullName: String,
        phone: String,
        houseFlat: String,
        streetArea: String,
        city: String,
        state: String,
        pincode: String,
        type: { type: String, enum: ['Home', 'Office'], default: 'Home' },
        isDefault: { type: Boolean, default: false }
      }
    ],
    cart: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        category: { type: String },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 }
      }
    ],
    wishlist: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        category: { type: String },
        inStock: { type: Boolean, default: true }
      }
    ]
  },
  {
    timestamps: true,
  }
);

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
