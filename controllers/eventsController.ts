import catchAsync from "../middleware/async";
import Event from "../models/Event";

import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";
import { deleteOne, updateOne, createOne, getOne, getAll } from "./factoryFunction";
// @desc    You can get all the events for trainer, owner id.
// @access  Private
// @route   GET /api/v1/Event/trainerEvents

export const getTrainerEvents = getAll(Event);

// catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user || !req.user.id) {
//     return next(new AppError("User not authenticated", 401));
//   }
//   const ownerId = req.user.id;

//   const event = new APIFeatures(Event.find({ ownerId }), req.query).filter().limitFields().sort().paginate();

//   const doc = await event.query;

//   res.status(200).json({ success: true, data: doc });
// });

// @desc    You can get a events on event for trainer, owner id.
// @access  Private
// @route   GET /api/v1/events/:id
export const getEvent = getOne(Event);

// @desc    You can create  the event on event
// @access  Private
// @route   POST /api/v1/events/getAllEvents
export const createEvent = createOne(Event);

// @desc    Update event as trainer
// @access  Private
// @route   PUT /api/v1/events/updateEvent/:id

export const updateEvent = updateOne(Event);

// @desc    Delete a event
// @access  Private
// @route   DELETE /api/v1/events/:id
export const deleteEvent = deleteOne(Event);

// @desc    You can get all the events on event for trainer, cient id.
// @access  Private
// @route   GET /api/v1/events/getAllEvents

// export const getClientEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.user || !req.user.id) {
//     return next(new AppError("User not authenticated", 401));
//   }
//   const client = req.user.id;

//   const event = new APIFeatures(Event.find({ client }), req.query).filter().limitFields().sort().paginate();

//   const doc = await event.query;

//   res.status(200).json({ success: true, data: doc });
// });
