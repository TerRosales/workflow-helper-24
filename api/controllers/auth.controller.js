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
        expires: expiryDate, // 1 day in milliseconds
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

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
      user.isVerified = true; // Add an isVerified field to your model
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

// export const googleAuth = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
//       const { password: hashedPassword, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//           expires: expiryDate,
//         })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const usernameBase = req.body.name.split(" ").join("").toLowerCase();
//       const randomString = Math.random().toString(36).slice(-8);
//       const username = (usernameBase + randomString).replace(/[^a-z0-9]/g, "");
//       const newUser = new User({
//         username,
//         email: req.body.email,
//         password: hashedPassword,
//         profilePicture: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET);
//       const { password: hashedPassword2, ...rest } = newUser._doc;
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//           expires: expiryDate,
//         })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (!user.isVerified) {
        // If the user is found but not verified, you might want to handle this case.
        // For example, you could prompt the user to complete the verification process.
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

export const signout = async (req, res) => {};
