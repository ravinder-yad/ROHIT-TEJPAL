import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Clear existing admins (optional, careful with this in production!)
    await Admin.deleteMany();

    const createdAdmin = await Admin.create({
      name: 'Rohit Tejpal',
      email: 'tejpalrohit4@gmail.com',
      password: 'password123', // Will be hashed by pre-save middleware
      isActive: true,
    });

    console.log(`Admin created: ${createdAdmin.email}`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
