import { Router } from "express";

import { isAdmin } from "../utils/isAdminMiddleware.js";
import { addTest } from "../controller/test.js";
import { jwtAuthMiddleware } from "../utils/jwt.js";

const router = Router();

router.route("/add/typing-test").post(jwtAuthMiddleware, isAdmin, addTest);

export default router;
