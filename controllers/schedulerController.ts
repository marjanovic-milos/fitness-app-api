import catchAsync from "../middleware/async";
import Scheduler from "../models/Scheduler";

import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";

// @desc    You can get all the events on scheduler for admin, owner id.
// @access  Private
// @route   GET /api/v1/scheduler/trainerEvents

export const getTrainerEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }
  const trainer = req.user.id;

  const scheduler = new APIFeatures(Scheduler.find({ trainer }), req.query).filter().limitFields().sort().paginate();

  const doc = await scheduler.query;

  res.status(200).json({ success: true, data: doc });
});

// @desc    You can get a events on scheduler for admin, owner id.
// @access  Private
// @route   GET /api/v1/scheduler/trainerSchedule/:id
export const getEventByTrainer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }

  const { id } = req.params;
  const event = await Scheduler.findById(id);

  res.status(200).json({ success: true, data: event });
});

// @desc    You can create  the event on scheduler
// @access  Private
// @route   POST /api/v1/scheduler/getAllEvents

export const createEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { excercisePlans, client, mealPlans } = req.body;

  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }
  const trainer = req.user.id;

  if (!excercisePlans || !client || !mealPlans) {
    return next(new AppError("All fields are required", 400));
  }

  const event = await Scheduler.create({
    mealPlans,
    excercisePlans,
    client,
    trainer,
  });

  res.status(200).json({
    status: "success",
    data: event,
  });
});

// @desc    You can get all the events on scheduler for admin, cient id.
// @access  Private
// @route   GET /api/v1/scheduler/getAllEvents

export const getClientEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }
  const client = req.user.id;

  const scheduler = new APIFeatures(Scheduler.find({ client }), req.query).filter().limitFields().sort().paginate();

  const doc = await scheduler.query;

  res.status(200).json({ success: true, data: doc });
});

// @desc    Update event, as admin
// @access  Private
// @route   PUT /api/v1/scheduler/updateEvent/:id

export const updateEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { client, mealPlans, excercisePlans } = req.body;

  const trainer = req?.user?.id;

  const updatedEvent = await Scheduler.findOneAndUpdate(
    { _id: id, trainer },
    { client, mealPlans, excercisePlans },
    { new: true, runValidators: true }
  );

  if (!updatedEvent) {
    return next(new AppError("Event not found or you are not authorized to update it.", 403));
  }
  res.status(200).json({
    status: "success",
    data: updatedEvent,
  });
});

// @desc    Delete a event
// @access  Private
// @route   DELETE /api/v1/scheduler/:id
export const deleteEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }
  const trainer = req.user.id;

  const deleteEvent = await Scheduler.findOneAndDelete({ _id: id, trainer });

  if (!deleteEvent) {
    return next(new AppError("Event not found or you are not authorized to update it.", 403));
  }

  res.status(200).json({
    status: "success",
    data: {},
  });
});

// @desc    Gets Event by ID
// @access  Private
// @route   GET /api/v1/event/:id
export const getEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.id) {
    return next(new AppError("User not authenticated", 401));
  }

  const { id } = req.params;
  const excercise = await Scheduler.findById(id);

  res.status(200).json({ success: true, data: excercise });
});
