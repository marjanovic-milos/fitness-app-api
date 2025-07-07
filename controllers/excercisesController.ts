import catchAsync from "../middleware/async";

import AppError from "../utils/appError";
import Excercise from "../models/Excercise";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";
import { deleteOne, updateOne, createOne } from "./factoryFunction";
// @desc    Gets All Excercises
// @access  Private
// @route   GET /api/v1/excercise/excercises
export const getAllExcercises = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
      return next(new AppError("User not authenticated", 401));
    }
    const ownerId = req?.user?.id;

    const excercises = new APIFeatures(Excercise.find({ ownerId }), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const doc = await excercises.query;

    res.status(200).json({ success: true, data: doc });
  }
);

// @desc    Gets One Excercise by ID
// @access  Private
// @route   GET /api/v1/excercise/:excerciseId
export const getExcerciseById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { excerciseId } = req.params;
    const excercise = await Excercise.findById(excerciseId);

    res.status(200).json({ success: true, data: excercise });
  }
);

// @desc    Add new Excercise
// @access  Private
// @route   POST /api/v1/excercise/addExcercise

export const addExcercise = createOne(Excercise);

// @desc    Update Excercise
// @access  Private
// @route   PUT /api/v1/excercise/updateExcercise

export const updateExcercise = updateOne(Excercise);

// @desc    Delete Excercise
// @access  Private
// @route   DELETE /api/v1/excercise/deleteExcercise

export const deleteExcercise = deleteOne(Excercise);
