import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail", // or any other service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
