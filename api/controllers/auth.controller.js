import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import { transporter } from "../utils/emailHandler.js";
import { fileURLToPath } from "url";
import { emailTemplate } from "../utils/emailTemplate.js";
import path from "path";
import { generateVerificationCode } from "../utils/codeGenerator.js";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const expiryDate = new Date(Date.now() + 3600000);

// Signup
export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });

  // Generate verification code
  const verificationCode = generateVerificationCode();

  try {
    const code = verificationCode;
    newUser.verificationCode = code; // Save the code to the user model
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

// Signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User was not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(400, "Incorrect Credentials, Please try again"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET, {});
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true, // Ensures the cookie is only sent over HTTPS
        expires: expiryDate, // 1 hour in milliseconds
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Verification
export const verification = async (req, res, next) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "User is already verified" });
    }

    if (user.verificationCode === code) {
      // Code is correct
      user.verificationCode = null; // Clear the code
      user.isVerified = true; // Mark the user as verified
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Email verified successfully" });
    } else {
      // Code is incorrect
      return res
        .status(400)
        .json({ success: false, message: "Invalid verification code" });
    }
  } catch (error) {
    next(error);
  }
};

// Google Authentication
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (!user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Please verify your email before logging in with Google.",
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const usernameBase = req.body.name.split(" ").join("").toLowerCase();
      const randomString = Math.random().toString(36).slice(-8);
      const username = (usernameBase + randomString).replace(/[^a-z0-9]/g, "");
      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// Guest Login
const dummyAccounts = [
  { email: "guest1@example.com", password: "guest123" },
  { email: "guest2@example.com", password: "guest123" },
  { email: "guest3@example.com", password: "guest123" },
];

export const guestLogin = async (req, res, next) => {
  try {
    // Select a random dummy account
    const randomAccount =
      dummyAccounts[Math.floor(Math.random() * dummyAccounts.length)];

    // Find the user in the database
    const user = await User.findOne({ email: randomAccount.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });

    // Send the token as a cookie and the user data as a response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 3600000),
      })
      .status(200)
      .json({ ...user._doc, password: undefined });
  } catch (error) {
    next(error);
  }
};

// Signout
export const signout = async (req, res) => {
  res.clearCookie("access_token").status(200).json({
    success: true,
    message: "Signout success",
  });
};
