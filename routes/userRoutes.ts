const express = require("express");
const {
  getUsers,
  getAllTrainers,
  getUser,
} = require("../controllers/userController");

import { protect, authorize } from "../middleware/auth";
const router = express.Router();

router.get("/trainers", protect, authorize("admin"), getAllTrainers);
router.get("/:id", protect, authorize("admin"), getUser);
router.get("/", protect, authorize("admin"), getUsers);

export default router;
