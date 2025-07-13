import express from "express";
const {
  getTrainerEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsController");
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/", getTrainerEvents);

router.post("/createEvent", protect, authorize("trainer"), createEvent);
router.put("/:id", protect, authorize("trainer"), updateEvent);
router.delete("/:id", protect, authorize("trainer"), deleteEvent);
router.get("/:id", getEvent);

export default router;
