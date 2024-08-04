import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/update/:id", verifyUserToken, updateUser);
router.delete("/:id", deleteUser);

export default router;
