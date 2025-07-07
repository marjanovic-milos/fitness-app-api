const express = require("express");
const { addMeal, updateMeal, deleteMeal, getOneMeal, getSavedMeals } = require("../controllers/mealsController");
const { mealsByNutrients, mealById } = require("../controllers/spoonacularApi");
import { protect, authorize } from "../middleware/auth";
const router = express.Router();

// Spoonacular API routes
router.get("/mealDetails/:id", protect, authorize("trainer"), mealById);
router.post("/byNutrients", protect, authorize("trainer"), mealsByNutrients);

// Database routes
router.post("/addMeal", protect, authorize("trainer"), addMeal);
router.put("/:id", protect, authorize("trainer"), updateMeal);
router.delete("/:id", protect, authorize("trainer"), deleteMeal);
router.get("/:id", protect, authorize("trainer", "client"), getOneMeal);
router.get("/", protect, authorize("trainer"), getSavedMeals);

export default router;
