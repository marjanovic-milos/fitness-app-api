import Event from "../models/Event";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./factoryFunction";
import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import catchAsync from "../middleware/async";

// @desc    You can get all the events for trainer, owner id.
// @access  Private
// @route   GET /api/v1/Event/trainerEvents

// export const getTrainerEvents = getAll(Event);

export const getTrainerEvents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let filter: any = {};
    const now = dayjs();
    const ownerId = req?.user?.id;
    filter = { ownerId };

    if (req.query.dateFilter) {
      if (req.query.dateFilter === "day") {
        filter.start = {
          $gte: now.startOf("day").toDate(),
          $lt: now.endOf("day").toDate(),
        };
      }

      if (req.query.dateFilter === "week") {
        filter.start = {
          $gte: now.startOf("week").toDate(),
          $lt: now.endOf("week").toDate(),
        };
      }

      if (req.query.dateFilter === "month") {
        filter.start = {
          $gte: now.startOf("month").toDate(),
          $lt: now.endOf("month").toDate(),
        };
      }

      // filter.repeatDays = { $exists: true, $ne: [] };
    }

    const data = await Event.find({ ...filter });

    res.status(200).json({ success: true, data });
  }
);

// @desc    You can get a events on event for trainer, owner id.
// @access  Private
// @route   GET /api/v1/events/:id
export const getEvent = getOne(Event);

// @desc    You can create  the event on event
// @access  Private
// @route   POST /api/v1/events/getAllEvents
// export const createEvent = createOne(Event);

export const createEvent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req?.user?.id;
    const repeatDays = req?.body?.repeatDays;
    let doc;
    if (!repeatDays?.length) {
      doc = await Event.create({ ...req.body, ownerId });
    } else {
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  }
);
// @desc    Update event as trainer
// @access  Private
// @route   PUT /api/v1/events/updateEvent/:id

export const updateEvent = updateOne(Event);

// @desc    Delete a event
// @access  Private
// @route   DELETE /api/v1/events/:id
export const deleteEvent = deleteOne(Event);
