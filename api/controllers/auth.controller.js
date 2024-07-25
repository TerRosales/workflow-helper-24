import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import { transporter } from "../utils/emailHandler.js";
import { fileURLToPath } from "url";
import { emailTemplate } from "../utils/emailTemplate.js";
import path from "path";
import { generateVerificationCode } from "../utils/codeGenerator.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });

  // Generate verification code
  const verificationCode = generateVerificationCode();

  try {
    const code = verificationCode;
    newUser.verificationCode = code; // Save the code to the user model (add this field in your model)
    await newUser.save();
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Verify Email from Workflow Helper`, // plain text body
      html: emailTemplate(verificationCode),
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
export const verification = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.verificationCode === code) {
      // Code is correct
      user.verificationCode = null; // Clear the code
      user.isVerified = true; // Add an isVerified field to your model
      await user.save();
      return res.status(200).json({ success: true, message: "Email verified successfully" });
    } else {
      // Code is incorrect
      return res.status(400).json({ success: false, message: "Invalid verification code" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
