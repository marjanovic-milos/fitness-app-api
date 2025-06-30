import catchAsync from "../middleware/async";
const { recepiesByNutrients, recepieById } = require("../api/spoonacularApi");
import AppError from "../utils/appError";
import Meal from "../models/Meal";

export const mealsByNutrients = catchAsync(async (req, res, next) => {
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
  console.log(response);
  res.status(201).json({
    status: "success",
    data: response,
  });
});

export const mealById = catchAsync(async (req, res, next) => {
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
export const addMeal = catchAsync(async (req, res, next) => {
  const { image, spoonacularId, title, sourceUrl } = req.body;

  if (!image || !spoonacularId || !title || !sourceUrl) {
    return next(new AppError("All fields are required", 400));
  }

  const meal = await Meal.create({
    image,
    spoonacularId,
    title,
    sourceUrl,
  });

  res.status(200).json({
    status: "success",
    data: meal,
  });
});
export const updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return next(new AppError("Please provide us with name!", 400));
  }

  const meal = await Meal.findByIdAndUpdate(
    id,
    { title },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: meal,
  });
});
export const deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findByIdAndDelete(id);
  if (!meal) {
    return next(new AppError("There is no meal with this id!", 400));
  }
  res.status(200).json({
    status: "success",
    data: {},
  });
});
export const getSavedMeals = catchAsync(async (req, res, next) => {
  const result = await Meal.find({});
  res.status(200).json({ success: true, data: result });
});
