import express from "express";
const { getMemberships, createMembership, updateMembership, getOneMembership, deleteMembership } = require("../controllers/membershipController");
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/", protect, authorize("trainer"), getMemberships);

router.post("/", protect, authorize("trainer"), createMembership);
router.put("/:id", protect, authorize("trainer"), updateMembership);
router.delete("/:id", protect, authorize("trainer"), deleteMembership);
router.get("/:id", getOneMembership);

export default router;
