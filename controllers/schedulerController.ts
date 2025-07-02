import catchAsync from "../middleware/async";

import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";

// @desc    You can get all the events on scheduler for admin, owner id.
// @access  Private
// @route   GET /api/v1/scheduler/getAllEvents

export const getAllEventsByTrainer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

// @desc    You can get a events on scheduler for admin, owner id.
// @access  Private
// @route   GET /api/v1/scheduler/getAllEvents/:id
export const getEventByTrainer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

// @desc    You can get all the events on scheduler for admin, cient id.
// @access  Private
// @route   GET /api/v1/scheduler/getAllEvents

export const getEventsByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

// @desc    You can get event for the user, client id.
// @access  Private
// @route   GET /api/v1/scheduler/getAllEvents/:id
export const getEventByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
