import Event from "../models/Event";

import { deleteOne, updateOne, getOne } from "./factoryFunction";
import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";

import catchAsync from "../middleware/async";

// @desc    You can get all the events for trainer, owner id.
// @access  Private
// @route   GET /api/v1/Event/trainerEvents

export const getTrainerEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
  }

  const data = await Event.find({ ...filter });

  res.status(200).json({ success: true, data });
});

// @desc    You can get a events on event for trainer, owner id.
// @access  Private
// @route   GET /api/v1/events/:id
export const getEvent = getOne(Event);

// @desc    You can create  the event on event
// @access  Private
// @route   POST /api/v1/events/getAllEvents
// export const createEvent = createOne(Event);

export const createEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req?.user?.id;
  const { start, end, repeatDays } = req.body;

  let docs;

  let repeatDaysArr: number[] = [];

  repeatDaysArr = repeatDays?.map((d: any) => Number(d));

  if (!repeatDaysArr?.length) {
    docs = [await Event.create({ ...req.body, ownerId })];
  } else {
    const rangeStart = dayjs(start).startOf("day");
    const rangeEnd = rangeStart.add(1, "month").endOf("month");

    const eventsToCreate = [];
    let current = rangeStart.clone();

    while (current.isBefore(rangeEnd) || current.isSame(rangeEnd, "day")) {
      if (repeatDaysArr.includes(current.day())) {
        eventsToCreate.push({
          ...req.body,
          ownerId,
          start: current.hour(dayjs(start).hour()).minute(dayjs(start).minute()).second(0).toDate(),
          end: current.hour(dayjs(end).hour()).minute(dayjs(end).minute()).second(0).toDate(),
          repeatDays: [],
        });
      }
      current = current.add(1, "day");
    }
    console.log(eventsToCreate, "eventsToCreate");
    docs = await Event.insertMany(eventsToCreate);
  }

  res.status(200).json({
    status: "success",
    count: docs.length,
    data: docs,
  });
});
// @desc    Update event as trainer
// @access  Private
// @route   PUT /api/v1/events/updateEvent/:id

export const updateEvent = updateOne(Event);

// @desc    Delete a event
// @access  Private
// @route   DELETE /api/v1/events/:id
export const deleteEvent = deleteOne(Event);
