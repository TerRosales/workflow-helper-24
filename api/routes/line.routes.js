import { Router } from "express";
import {
  createLine,
  getAllLines,
  getLineById,
  updateLine,
  deleteLine,
} from "../controllers/line.controller.js";

const router = Router();

router.post("/", createLine);
router.get("/", getAllLines);
router.get("/:id", getLineById);
router.put("/:id", updateLine);
router.delete("/:id", deleteLine);

export default router;
