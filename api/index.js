import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import lineRoutes from "./routes/line.routes.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

const app = express();

app.use(express.json());

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

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lines", lineRoutes);
app.use("/api/product", productRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// GET - Read all Users
// POST - Create a User
// PUT - Update a User
// DELETE - Delete a User

// GET - Read all Lines
// POST - Create a Line
// PUT - Update a Line
// DELETE - Delete a Line

// GET - Read one Products
// POST - Create a Product
// PUT - Update a Product
// DELETE - Delete a Product
