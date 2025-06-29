const catchAsync = require("../middleware/async");
const { recepies } = require("../utils/recepiesApi");
const AppError = require("../utils/appError");

exports.findMeal = catchAsync(async (req, res, next) => {
  const { maxCarbs, minCarbs, maxProtein, minProtein } = req.body;

  if (!minCarbs && !maxCarbs && !minProtein && !maxProtein) {
    return next(new AppError("You need to set at least one of the nutrients!", 400));
  }

  const response = await recepies({
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

exports.updateMeal = catchAsync(async (req, res, next) => {});
exports.deleteMeal = catchAsync(async (req, res, next) => {});
exports.saveMeal = catchAsync(async (req, res, next) => {});
