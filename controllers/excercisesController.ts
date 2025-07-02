import catchAsync from "../middleware/async";
import AppError from "../utils/appError";
import Excercise from "../models/Excercise";

export const getAllExcercises = catchAsync(async (req: any, res, next) => {
  const ownerId = req.user.id;

  const excercises = await Excercise.find({ ownerId });

  res.status(200).json({ success: true, data: excercises });
});
export const addExcercise = catchAsync(async (req, res, next) => {
  const { name, video, notes } = req.body;

  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }
  const ownerId = req.user.id;

  if (!name || !video || !notes) {
    return next(new AppError("All fields are required", 400));
  }

  const excercise = await Excercise.create({
    name,
    video,
    notes,
    ownerId,
  });

  res.status(200).json({
    status: "success",
    data: excercise,
  });
});
export const updateExcercise = catchAsync(async (req, res, next) => {});
export const deleteExcercise = catchAsync(async (req, res, next) => {});
