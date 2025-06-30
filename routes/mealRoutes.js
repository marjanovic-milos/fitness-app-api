const express = require("express");
const {
  mealsByNutrients,
  mealById,
  addMeal,
} = require("../controllers/mealsController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

// router.get("/:id", protect, authorize("admin"), mealById);
// router.post("/byNutrients", protect, authorize("admin"), mealsByNutrients);
router.post("/addMeal", protect, authorize("admin"), addMeal);

module.exports = router;
