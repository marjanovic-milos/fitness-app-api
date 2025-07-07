import catchAsync from "../middleware/async";
const { recepiesByNutrients, recepieById } = require("../api/spoonacularApi");
import AppError from "../utils/appError";
import Meal from "../models/Meal";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";
import { deleteOne, updateOne, createOne } from "./factoryFunction";
// @desc    Find meals by nutrients from Spoonacular API
// @access  Private
// @route   POST /api/v1/meals/byNutrients

export const mealsByNutrients = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { maxCarbs, minCarbs, maxProtein, minProtein } = req.body;

    if (!minCarbs && !maxCarbs && !minProtein && !maxProtein) {
      return next(
        new AppError("You need to set at least one of the nutrients!", 400)
      );
    }

    const response = await recepiesByNutrients({
      maxCarbs,
      minCarbs,
      maxProtein,
      minProtein,
    });

    res.status(201).json({
      status: "success",
      data: response,
    });
  }
);
// @desc    Find meal detail by id from Spoonacular API
// @access  Private
// @route   GET /api/v1/meals/mealDetails/:id
export const mealById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Meal ID is required", 400));
    }

    const meal = await recepieById(id);
    if (!meal) {
      return next(new AppError("Meal not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: meal,
    });
  }
);

// @desc    Get all saved meals
// @access  Private
// @route   GET /api/v1/meals
export const getSavedMeals = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;

    const meals = new APIFeatures(Meal.find({ ownerId }), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const doc = await meals.query;

    res.status(200).json({ success: true, data: doc });
  }
);

// @desc    Add a new meal
// @access  Private
// @route   POST /api/v1/meals/addMeal
export const addMeal = createOne(Meal);

// @desc    Update a meal
// @access  Private
// @route   PUT /api/v1/meals/updateMeal/:id
export const updateMeal = updateOne(Meal);

// @desc    Delete a meal
// @access  Private
// @route   DELETE /api/v1/meals/:id
export const deleteMeal = deleteOne(Meal);
