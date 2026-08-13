import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./models/Order.js";
import Product from "./models/Product.js";

dotenv.config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Get a product to associate with the dummy orders
    const products = await Product.find({}).limit(2);
    if (products.length === 0) {
      console.log("No products found! Please add products first.");
      process.exit(1);
    }

    const p1 = products[0];
    const p2 = products.length > 1 ? products[1] : products[0];

    // Dummy orders array
    const dummyOrders = [
      {
        orderNumber: "RT-1001",
        customer: {
          name: "Rahul Sharma",
          email: "rahul@example.com",
          phone: "9876543210"
        },
        items: [
          {
            product: p1._id,
            productName: p1.name,
            image: p1.images?.front || "",
            size: "M",
            quantity: 1,
            price: p1.price || 2500,
            subtotal: (p1.price || 2500) * 1
          }
        ],
        totalAmount: (p1.price || 2500) * 1,
        paymentStatus: "paid",
        orderStatus: "delivered",
        orderType: "website",
        shippingAddress: {
          address: "123 MG Road",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001"
        }
      },
      {
        orderNumber: "RT-1002",
        customer: {
          name: "Priya Singh",
          email: "priya@example.com",
          phone: "9876543211"
        },
        items: [
          {
            product: p2._id,
            productName: p2.name,
            image: p2.images?.front || "",
            size: "L",
            quantity: 2,
            price: p2.price || 1500,
            subtotal: (p2.price || 1500) * 2
          }
        ],
        totalAmount: (p2.price || 1500) * 2,
        paymentStatus: "pending",
        orderStatus: "processing",
        orderType: "whatsapp",
        shippingAddress: {
          address: "45 Lajpat Nagar",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110024"
        }
      },
      {
        orderNumber: "RT-1003",
        customer: {
          name: "Neha Gupta",
          email: "neha@example.com",
          phone: "9876543212"
        },
        items: [
          {
            product: p1._id,
            productName: p1.name,
            image: p1.images?.front || "",
            size: "S",
            quantity: 1,
            price: p1.price || 3000,
            subtotal: (p1.price || 3000) * 1
          },
          {
            product: p2._id,
            productName: p2.name,
            image: p2.images?.front || "",
            size: "M",
            quantity: 1,
            price: p2.price || 2000,
            subtotal: (p2.price || 2000) * 1
          }
        ],
        totalAmount: ((p1.price || 3000) * 1) + ((p2.price || 2000) * 1),
        paymentStatus: "paid",
        orderStatus: "shipped",
        orderType: "website",
        shippingAddress: {
          address: "78 Residency Road",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560025"
        }
      },
      {
        orderNumber: "RT-1004",
        customer: {
          name: "Anjali Verma",
          email: "anjali@example.com",
          phone: "9876543213"
        },
        items: [
          {
            product: p1._id,
            productName: p1.name,
            image: p1.images?.front || "",
            size: "XL",
            quantity: 1,
            price: p1.price || 4000,
            subtotal: (p1.price || 4000) * 1
          }
        ],
        totalAmount: (p1.price || 4000) * 1,
        paymentStatus: "pending",
        orderStatus: "pending",
        orderType: "website",
        shippingAddress: {
          address: "90 Mall Road",
          city: "Shimla",
          state: "Himachal Pradesh",
          pincode: "171001"
        }
      }
    ];

    // Clear existing dummy orders if any
    await Order.deleteMany({});
    console.log("Cleared existing orders.");

    // Insert new dummy orders
    await Order.insertMany(dummyOrders);
    console.log("Successfully seeded 4 dummy orders!");

    // Also update a product stock to 3 (Low stock)
    p1.stock = 3;
    await p1.save();
    console.log(`Updated product '${p1.name}' stock to 3 (Low Stock).`);

    process.exit();
  } catch (error) {
    console.error("Error with seeding:", error);
    process.exit(1);
  }
};

seedOrders();
