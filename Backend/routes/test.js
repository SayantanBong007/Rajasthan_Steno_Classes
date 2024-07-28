import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import {
  addTest,
  deleteTest,
  getAllTests,
  updateTest,
  getTestDetails
} from "../controller/test.js";

const router = Router();

// Route to add a test (admin only)
router.post("/add", authMiddleware, addTest);

// Route to get all tests (no auth required)
router.get("/", getAllTests);
router.get("/:id", getTestDetails);

// Route to update a test (admin only)
router.put("/update/:id", authMiddleware, updateTest);

// Route to delete a test (admin only)
router.delete("/delete/:id", authMiddleware, deleteTest);

export default router;
