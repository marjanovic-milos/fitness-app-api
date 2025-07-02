const express = require("express");
const {
  getAllExcercises,
  addExcercise,
  updateExcercise,
  deleteExcercise,
} = require("../controllers/excercisesController");

import { protect, authorize } from "../middleware/auth";
const router = express.Router();

router.get("/", protect, authorize("admin"), getAllExcercises);
router.post("/addExcercise", protect, authorize("admin"), addExcercise);
router.put("/updateExcercise", protect, authorize("admin"), updateExcercise);
router.delete("/deleteExcercise", protect, authorize("admin"), deleteExcercise);

export default router;
