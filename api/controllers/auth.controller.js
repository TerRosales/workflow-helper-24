import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import { transporter } from "../utils/emailHandler.js";
import { fileURLToPath } from "url";
import { emailTemplate, verificationCode } from "../utils/emailTemplate.js";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });
  try {
    await newUser.save();
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Verify Email from Workflow Helper`, // plain text body
      html: emailTemplate,
      // html: `<b>Email from Workflow Helper</b><br/><a href="https://thai-rest.tr-dev.dev/" target="_blank">hi</a>`,
    };

    res.status(201).json({ success: true, message: "Signup success" });
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent");
    } catch (error) {
      console.error("Error sending email: ", error);
      // If email fails, don't stop the signup process, just log the error
    }
  } catch (error) {
    next(errorHandler(300, `Signup failed - ${error.message} -`));
  }
};

export const signin = async (req, res) => {};
export const signout = async (req, res) => {};
export const verification = async (req, res) => {};
