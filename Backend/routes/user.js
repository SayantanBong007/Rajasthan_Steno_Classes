import { Router } from "express";
import {
  getUser,
  getUserHistory,
  loginUser,
  registerUser,
} from "../controller/user.js";
import { jwtAuthMiddleware } from "../jwt.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(jwtAuthMiddleware, getUser);
router.route("/history").get(jwtAuthMiddleware, getUserHistory);

export default router;
