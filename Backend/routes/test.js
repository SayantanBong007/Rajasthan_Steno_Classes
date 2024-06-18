import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import {
  addTest,
  deleteTest,
  getAllTests,
  updateTest,
} from "../controller/test.js";
import { isAdmin } from "../controller/test.js";

const router = Router();

// Route to add a test (admin only)
router.post("/add", authMiddleware, isAdmin, addTest);

// Route to get all tests (no auth required)
router.get("/", getAllTests);

// Route to update a test (admin only)
router.put("/update/:id", authMiddleware, isAdmin, updateTest);

// Route to delete a test (admin only)
router.delete("/delete/:id", authMiddleware, isAdmin, deleteTest);

export default router;
