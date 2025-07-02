import catchAsync from "../middleware/async";
const { recepiesByNutrients, recepieById } = require("../api/spoonacularApi");
import AppError from "../utils/appError";
import Meal from "../models/Meal";
import { Request, Response, NextFunction } from "express";

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

    const result = await Meal.find({ ownerId });
    res.status(200).json({ success: true, data: result });
  }
);

// @desc    Add a new meal
// @access  Private
// @route   POST /api/v1/meals/addMeal
export const addMeal = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { image, spoonacularId, title, sourceUrl } = req.body;

    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;
    if (!image || !spoonacularId || !title || !sourceUrl) {
      return next(new AppError("All fields are required", 400));
    }

    const meal = await Meal.create({
      image,
      spoonacularId,
      title,
      sourceUrl,
      ownerId,
    });

    res.status(200).json({
      status: "success",
      data: meal,
    });
  }
);

// @desc    Update a meal
// @access  Private
// @route   PUT /api/v1/meals/updateMeal/:id
export const updateMeal = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;
    if (!title) {
      return next(new AppError("Please provide us with name!", 400));
    }

    const updatedMeal = await Meal.findOneAndUpdate(
      { _id: id, ownerId },
      { title },
      { new: true, runValidators: true }
    );

    if (!updatedMeal) {
      return next(
        new AppError(
          "Meal not found or you are not authorized to update it.",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: updatedMeal,
    });
  }
);
// @desc    Delete a meal
// @access  Private
// @route   DELETE /api/v1/meals/:id
export const deleteMeal = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;

    const deleteMeal = await Meal.findOneAndDelete({ _id: id, ownerId });

    if (!deleteMeal) {
      return next(
        new AppError(
          "Meal not found or you are not authorized to update it.",
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {},
    });
  }
);
