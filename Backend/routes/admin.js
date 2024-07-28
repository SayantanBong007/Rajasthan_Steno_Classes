import { Router } from "express";
import multer from "multer";
import { isAdmin } from "../utils/isAdminMiddleware.js";
import { addTest } from "../controller/test.js";
import { jwtAuthMiddleware } from "../utils/jwt.js";

const router = Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/add/typing-test").post(jwtAuthMiddleware, isAdmin, addTest);
router
  .route("/add/steno-test")
  .post(jwtAuthMiddleware, isAdmin, upload.single("audio"), addTest);

export default router;
