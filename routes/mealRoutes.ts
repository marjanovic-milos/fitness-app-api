const express = require("express");
const {
  mealsByNutrients,
  mealById,
  addMeal,
  updateMeal,
  deleteMeal,
  getSavedMeals,
} = require("../controllers/mealsController");

import { protect, authorize } from "../middleware/auth";
const router = express.Router();

// Spoonacular API routes
router.get("/mealDetails/:id", protect, authorize("trainer"), mealById);
router.post("/byNutrients", protect, authorize("trainer"), mealsByNutrients);

// Database routes
router.post("/addMeal", protect, authorize("trainer"), addMeal);
router.put("/updateMeal/:id", protect, authorize("trainer"), updateMeal);
router.delete("/:id", protect, authorize("trainer"), deleteMeal);
router.get("/", protect, authorize("trainer"), getSavedMeals);

export default router;
