const express = require("express");
const { createMeal } = require("../controllers/mealsController");

const router = express.Router();

router.get("/createMeal", createMeal);

module.exports = router;
