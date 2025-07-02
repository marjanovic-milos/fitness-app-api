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
router.get("/mealDetails/:id", protect, authorize("admin"), mealById);
router.post("/byNutrients", protect, authorize("admin"), mealsByNutrients);

// Database routes
router.post("/addMeal", protect, authorize("admin"), addMeal);
router.put("/updateMeal/:id", protect, authorize("admin"), updateMeal);
router.delete("/:id", protect, authorize("admin"), deleteMeal);
router.get("/", protect, authorize("admin"), getSavedMeals);

export default router;
