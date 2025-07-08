import Excercise from "../models/Excercise";

import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./factoryFunction";

// @desc    Gets All Excercises
// @access  Private
// @route   GET /api/v1/excercise/excercises

export const getAllExcercises = getAll(Excercise);

// @desc    Gets One Excercise by ID
// @access  Private
// @route   GET /api/v1/excercise/:excerciseId

export const getExcerciseById = getOne(Excercise);

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
