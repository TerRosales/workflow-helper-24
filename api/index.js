// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import userRoutes from "./routes/user.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import lineRoutes from "./routes/line.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// mongoose
//   .connect(process.env.MONGODB)
//   .then(() => {
//     console.log("DB connected");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("DB connection failed", err);
//   });

// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/lines", lineRoutes);
// app.use("/api/product", productRoutes);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({
//     success: false,
//     message,
//     statusCode,
//   });
// });

// DEPLOYMNENT

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import lineRoutes from "./routes/line.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import serverless from "serverless-http"; // Import serverless-http to handle Express app

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

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

// Export the Express app wrapped with serverless-http
export const handler = serverless(app);
