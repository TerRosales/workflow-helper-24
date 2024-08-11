import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import lineRoutes from "./routes/line.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Needed to resolve __dirname

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://workflow-helper-24.onrender.com"], // Your frontend's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Use CORS with the defined options
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lines", lineRoutes);
app.use("/api/product", productRoutes);

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
