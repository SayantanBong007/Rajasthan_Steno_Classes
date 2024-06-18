import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware.js"; // Middleware for user authentication
import { isAdmin } from "../utils/isAdminMiddleware.js"; // Middleware for admin authorization
import {
  addTest,
  getAllTests,
  updateTest,
  deleteTest,
} from "../controller/stenotest.js";
import multer from "multer";
import path from "path";

const router = Router();

// Set up storage and file filtering for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/steno_tests/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique name
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/mp3"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only audio files are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

// Route to add a test (admin only)
router.post("/add", authMiddleware, isAdmin, upload.single("audio"), addTest);

// Route to get all tests (no auth required)
router.get("/", getAllTests);

// Route to update a test (admin only)
router.put(
  "/update/:id",
  authMiddleware,
  isAdmin,
  upload.single("audio"),
  updateTest
);

// Route to delete a test (admin only)
router.delete("/delete/:id", authMiddleware, isAdmin, deleteTest);

export default router;
