import express from "express";
import {
  signup,
  signin,
  signout,
  verification,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
// router.post("/verify-email", verification);
export default router;
