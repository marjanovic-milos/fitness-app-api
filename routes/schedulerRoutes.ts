import express from "express";
const { getTrainerEvents, createEvent, getEvent, getClientEvents, updateEvent, deleteEvent } = require("../controllers/schedulerController");
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/trainerEvents", protect, authorize("admin"), getTrainerEvents);
router.get("/clientEvents", protect, authorize("user"), getClientEvents);

router.post("/createEvent", protect, authorize("admin"), createEvent);
router.put("/:id", protect, authorize("admin"), updateEvent);
router.delete("/:id", protect, authorize("admin"), deleteEvent);
router.get("/:id", protect, getEvent);

export default router;
