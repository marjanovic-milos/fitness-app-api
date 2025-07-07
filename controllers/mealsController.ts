import catchAsync from "../middleware/async";
import AppError from "../utils/appError";
import Meal from "../models/Meal";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";
import { deleteOne, updateOne, createOne, getOne, getAll } from "./factoryFunction";

// @desc    Get all saved meals
// @access  Private
// @route   GET /api/v1/meals

export const getSavedMeals = getAll(Meal);
// export const getSavedMeals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user || !req.user.id) {
//     return next(new AppError("User not authenticated", 401));
//   }
//   const ownerId = req.user.id;

//   const meals = new APIFeatures(Meal.find({ ownerId }), req.query).filter().limitFields().sort().paginate();

//   const doc = await meals.query;

//   res.status(200).json({ success: true, data: doc });
// });

// @desc    Get meal by Id
// @access  Private
// @route   GET /api/v1/meals/:id
export const getOneMeal = getOne(Meal);
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
