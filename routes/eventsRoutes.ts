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

router.get("/", protect, authorize("trainer"), getTrainerEvents);
// router.get("/clientEvents", protect, authorize("client"), getClientEvents);

router.post("/createEvent", protect, authorize("trainer"), createEvent);
router.put("/:id", protect, authorize("trainer"), updateEvent);
router.delete("/:id", protect, authorize("trainer"), deleteEvent);
router.get("/:id", protect, getEvent);

export default router;
