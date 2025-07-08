import Event from "../models/Event";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./factoryFunction";
// @desc    You can get all the events for trainer, owner id.
// @access  Private
// @route   GET /api/v1/Event/trainerEvents

export const getTrainerEvents = getAll(Event);

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
