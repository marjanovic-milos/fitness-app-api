import catchAsync from "../middleware/async";
import Scheduler from "../models/Scheduler";

import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";

// @desc    You can get all the events on scheduler for admin, owner id.
// @access  Private
// @route   GET /api/v1/scheduler/trainerSchedule

export const getAllEventsByTrainer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;

    const scheduler = new APIFeatures(Scheduler.find({ ownerId }), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const doc = await scheduler.query;

    res.status(200).json({ success: true, data: doc });
  }
);

// @desc    You can get a events on scheduler for admin, owner id.
// @access  Private
// @route   GET /api/v1/scheduler/trainerSchedule/:id
export const getEventByTrainer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }

    const { id } = req.params;
    const event = await Scheduler.findById(id);

    res.status(200).json({ success: true, data: event });
  }
);

// @desc    You can create  the event on scheduler
// @access  Private
// @route   POST /api/v1/scheduler/getAllEvents

export const createEvent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { excercisePlans, client, mealPlans } = req.body;

    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req.user.id;

    // if (!name || !video || !notes) {
    //   return next(new AppError("All fields are required", 400));
    // }

    const event = await Scheduler.create({
      mealPlans,
      excercisePlans,
      client,
      ownerId,
    });

    res.status(200).json({
      status: "success",
      data: event,
    });
  }
);

// @desc    You can get all the events on scheduler for admin, cient id.
// @access  Private
// @route   GET /api/v1/scheduler/getAllEvents

export const getEventsByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

// @desc    You can get event for the user, client id.
// @access  Private
// @route   GET /api/v1/scheduler/getAllEvents/:id
export const getEventByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
