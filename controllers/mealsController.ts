import catchAsync from "../middleware/async";
const { recepiesByNutrients, recepieById } = require("../api/spoonacularApi");
import AppError from "../utils/appError";
import Meal from "../models/Meal";

export const mealsByNutrients = catchAsync(async (req, res, next) => {
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

export const mealById = catchAsync(async (req: any, res, next) => {
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
export const addMeal = catchAsync(async (req: any, res, next) => {
  const { image, spoonacularId, title, sourceUrl } = req.body;

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
});
export const updateMeal = catchAsync(async (req: any, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  const ownerId = req.user.id;

  if (!title) {
    return next(new AppError("Please provide us with name!", 400));
  }

  const updatedMeal = await Meal.findOneAndUpdate({ _id: id, ownerId }, { title }, { new: true, runValidators: true });

  if (!updatedMeal) {
    return next(new AppError("Meal not found or you are not authorized to update it.", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedMeal,
  });
});
export const deleteMeal = catchAsync(async (req: any, res, next) => {
  const { id } = req.params;
  const ownerId = req.user.id;

  const deleteMeal = await Meal.findOneAndDelete({ _id: id, ownerId });

  if (!deleteMeal) {
    return next(new AppError("Meal not found or you are not authorized to update it.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {},
  });
});

export const getSavedMeals = catchAsync(async (req: any, res, next) => {
  const ownerId = req.user.id;

  const result = await Meal.find({ ownerId });
  res.status(200).json({ success: true, data: result });
});
