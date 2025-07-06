const express = require("express");
const {
  getUsers,
  getAllTrainers,
  getUser,
} = require("../controllers/userController");

import { protect, authorize } from "../middleware/auth";
const router = express.Router();

router.get("/trainers", protect, authorize("trainer"), getAllTrainers);
router.get("/:id", protect, authorize("trainer"), getUser);
router.get("/", protect, authorize("trainer"), getUsers);

export default router;
