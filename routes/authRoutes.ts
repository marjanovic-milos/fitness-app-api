import express from "express";
import { signup, login, getMe, logout } from "../controllers/authController";

import { protect } from "../middleware/auth";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protect);
router.get("/getMe", getMe);
router.post("/logout", logout);

export default router;
