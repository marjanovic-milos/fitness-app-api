const express = require("express");
const {
  getAllEventsByTrainer,
  createEvent,
} = require("../controllers/schedulerController");
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

router.get(
  "/trainerSchedule",
  protect,
  authorize("admin"),
  getAllEventsByTrainer
);

router.post("/", protect, authorize("admin"), createEvent);

export default router;
