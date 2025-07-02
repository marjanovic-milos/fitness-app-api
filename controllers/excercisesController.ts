import catchAsync from "../middleware/async";
import AppError from "../utils/appError";
import Excercise from "../models/Excercise";
import { Request, Response, NextFunction } from "express";

export const getAllExcercises = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;
    const excercises = await Excercise.find({ ownerId });

    res.status(200).json({ success: true, data: excercises });
  }
);
export const addExcercise = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);
export const updateExcercise = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, video, notes } = req.body;

    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;

    const updatedExcercise = await Excercise.findOneAndUpdate(
      { _id: id, ownerId },
      { name, video, notes },
      { new: true, runValidators: true }
    );

    if (!updatedExcercise) {
      return next(
        new AppError(
          "Excercise not found or you are not authorized to update it.",
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

export const deleteExcercise = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;

    const deleteExcercise = await Excercise.findOneAndDelete({
      _id: id,
      ownerId,
    });

    if (!deleteExcercise) {
      return next(
        new AppError(
          "Excercise not found or you are not authorized to update it.",
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
