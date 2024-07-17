import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
dotenv.config();
const app = express();

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

app.get("/", (req, res) => {
  res.send("api connected");
});

// GET - Read all Lines
// POST - Create a Line
// PUT - Update a Line
// DELETE - Delete a Line

// GET - Read one Products
// POST - Create a Product
// PUT - Update a Product
// DELETE - Delete a Product
