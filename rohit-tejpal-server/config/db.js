import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // process.exit(1); // Removed to prevent complete server crash on network drop
  }
};

export default connectDB;