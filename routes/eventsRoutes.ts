import express from "express";
const { getTrainerEvents, createEvent, getEvent, getClientEvents, updateEvent, deleteEvent } = require("../controllers/eventsController");
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/trainerEvents", protect, authorize("trainer"), getTrainerEvents);
// router.get("/clientEvents", protect, authorize("client"), getClientEvents);

router.post("/createEvent", protect, authorize("trainer"), createEvent);
router.put("/:id", protect, authorize("trainer"), updateEvent);
router.delete("/:id", protect, authorize("trainer"), deleteEvent);
router.get("/:id", protect, getEvent);

export default router;
