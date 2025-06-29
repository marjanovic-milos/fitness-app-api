const express = require("express");
const { findMeal } = require("../controllers/mealsController");

const router = express.Router();

router.post("/findMeal", findMeal);

module.exports = router;
