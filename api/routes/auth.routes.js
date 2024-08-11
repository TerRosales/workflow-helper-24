import express from "express";
import {
  signup,
  signin,
  signout,
  verification,
  googleAuth,
  guestLogin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/google", googleAuth);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/verify", verification);
router.post("/guest-login", guestLogin);

export default router;
