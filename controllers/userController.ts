import catchAsync from "../middleware/async";
import AppError from "../utils/appError";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";

// @desc    Get all users for Trainner
// @access  Private
// @route   GET /api/v1/users
export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;

    const users = new APIFeatures(
      User.find({ assignedTrainner: ownerId }),
      req.query
    )
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const doc = await users.query;

    res.status(200).json({ success: true, data: doc });
  }
);

// @desc    Get a user as a Trainner
// @access  Private
// @route   GET /api/v1/users/:id
export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || user.assignedTrainner !== ownerId) {
      return next(
        new AppError("User not found or you are not authorized to see it.", 404)
      );
    }

    res.status(200).json({ success: true, data: user });
  }
);

// @desc    Get all Trainers
// @access  Private
// @route   GET /api/v1/users/trainers
export const getAllTrainers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }

    const trainers = new APIFeatures(User.find({ role: "trainer" }), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const doc = await trainers.query;

    res.status(200).json({ success: true, data: doc });
  }
);
