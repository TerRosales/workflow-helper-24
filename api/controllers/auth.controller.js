import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ email, username, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "Signup success" });
  } catch (error) {
    next(errorHandler(300, `Signup failed - ${error.message} -`));
  }
};

export const signin = async (req, res) => {};

export const signout = async (req, res) => {};

export const verification = async (req, res) => {};
