// ============================================
// COMP229 - Job Portal Application Server
// Main server file implementing Express.js backend
// ============================================

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ============================================
// PATH SETUP (ES MODULE FIX)
// ============================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// ENV CONFIG
// ============================================

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS CONFIG (FIXED)
// ============================================

const allowedOrigins = [
  "https://jb-acfu.onrender.com",                 // ✅ frontend
  "https://jobportal-backend-jihl.onrender.com",  // backend (safe)
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("[CORS] Incoming origin:", origin);

      // Allow server-to-server & health checks
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    }
  })
);

// ============================================
// BODY PARSERS
// ============================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// REQUEST LOGGER
// ============================================

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// ============================================
// STATIC FILES
// ============================================

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================
// ROUTES
// ============================================

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);

// ============================================
// HEALTH CHECKS
// ============================================

app.get("/api/health", (req, res) => {
  res.json({
    message: "Job Portal API is running",
    time: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ============================================
// DATABASE CONNECTION
// ============================================

const connectDB = async () => {
  try {
    console.log("[DB] Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`[DB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("[DB] Connection failed:", err.message);
    process.exit(1);
  }
};

// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    message: "Server error",
    error: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message
  });
});

// ============================================
// 404 HANDLER
// ============================================

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ============================================
// START SERVER
// ============================================

const startServer = async () => {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

export default app;
