import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

import path from "path";
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Set Security HTTP Headers (Protects against XSS, Clickjacking, etc)
app.use(helmet());

// 2. Limit requests from same API (Protects against DDoS & Brute Force)
const limiter = rateLimit({
  max: 150, // Limit each IP to 150 requests per window (15 mins)
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// 3. Body parser with size limits (Protects against large payload attacks)
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// 4. Data Sanitization against NoSQL Query Injection (e.g. email: {"$gt": ""})
app.use(mongoSanitize());

// 5. Data Sanitization against XSS (Cross-Site Scripting)
app.use(xss());

// 6. Prevent HTTP Parameter Pollution
app.use(hpp());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://rohit-tejpal.vercel.app",
  "https://rohit-tejpal-578x.vercel.app",
  "https://rohit-tejpal-admin.vercel.app",
  "https://www.rohittejpal.com",
  "https://rohittejpal.com",
  "https://admin.rohittejpal.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/health", (_req, res) => res.json({ success: true, message: "API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
