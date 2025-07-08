import Meal from "../models/Meal";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./factoryFunction";

// @desc    Get all saved meals
// @access  Private
// @route   GET /api/v1/meals

export const getSavedMeals = getAll(Meal);

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
