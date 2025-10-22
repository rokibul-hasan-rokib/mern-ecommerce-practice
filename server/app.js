import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import ErrorHandler from "./src/utils/errorHandler.js";
import errorMiddleware from "./src/middlewares/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check route
app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully!",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Import routes
import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

// API routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

// Handle undefined routes
// app.all("/*", (req, res, next) => {
//   next(new ErrorHandler(`Route ${req.originalUrl} not found`, 404));
// });

// Global error handling middleware
app.use(errorMiddleware);

export default app;
