const express = require("express");
const { getAllExcercises, addExcercise } = require("../controllers/excercisesController");

import { protect, authorize } from "../middleware/auth";
const router = express.Router();

router.get("/", protect, authorize("admin"), getAllExcercises);
router.post("/", protect, authorize("admin"), addExcercise);

export default router;
