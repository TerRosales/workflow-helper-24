import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import lineRoutes from "./routes/line.routes.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
console.log(process.env.EMAIL, process.env.PASSWORD);

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

// Bottom snippet works for nodemailer
// import nodemailer from "nodemailer";
// import { fileURLToPath } from "url";
// import path from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// const mailOptions = {
//   from: {
//     name: "TR-DEV",
//     address: process.env.EMAIL,
//   }, // sender address
//   to: "gummBOOM2@gmail.com", // list of receivers
//   subject: "Email Verification", // Subject line
//   text: "Hello world?", // plain text body
//   html: `<b>Email from Workflow Helper</b><br/><a href="https://thai-rest.tr-dev.dev/" target="_blank">hi</a>`, // html body
//   attachments: {
//     filename: "test.jpg",
//     path: path.join(__dirname, "./utils/test.jpg"),
//     contentType: "image/jpeg",
//   },
// };

// const sendMail = async (transporter, mailOptions) => {
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email sent");
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// };

// sendMail(transporter, mailOptions);
