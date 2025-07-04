const express = require("express");
const {
  getAllExcercises,
  addExcercise,
  updateExcercise,
  deleteExcercise,
  getExcerciseById,
} = require("../controllers/excercisesController");

import { protect, authorize } from "../middleware/auth";
const router = express.Router();

router.get("/", protect, authorize("admin"), getAllExcercises);
router.post("/addExcercise", protect, authorize("admin"), addExcercise);
router.put("/:id", protect, authorize("admin"), updateExcercise);
router.delete("/:id", protect, authorize("admin"), deleteExcercise);

export default router;
