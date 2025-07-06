const express = require("express");
const { getAllExcercises, addExcercise, updateExcercise, deleteExcercise, getExcerciseById } = require("../controllers/excercisesController");

import { protect, authorize } from "../middleware/auth";
const router = express.Router();

router.get("/", protect, authorize("trainer"), getAllExcercises);
router.post("/addExcercise", protect, authorize("trainer"), addExcercise);
router.put("/:id", protect, authorize("trainer"), updateExcercise);
router.delete("/:id", protect, authorize("trainer"), deleteExcercise);

export default router;
