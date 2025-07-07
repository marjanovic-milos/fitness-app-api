import catchAsync from "../middleware/async";
import AppError from "../utils/appError";
const { recepiesByNutrients, recepieById } = require("../api/spoonacularApi");
import { Request, Response, NextFunction } from "express";

// @desc    Find meals by nutrients from Spoonacular API
// @access  Private
// @route   POST /api/v1/meals/byNutrients

export const mealsByNutrients = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { maxCarbs, minCarbs, maxProtein, minProtein } = req.body;

  if (!minCarbs && !maxCarbs && !minProtein && !maxProtein) {
    return next(new AppError("You need to set at least one of the nutrients!", 400));
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
});
// @desc    Find meal detail by id from Spoonacular API
// @access  Private
// @route   GET /api/v1/meals/mealDetails/:id
export const mealById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
});
