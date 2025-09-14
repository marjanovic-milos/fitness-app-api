import Membership from "../models/Membership";
import catchAsync from "../middleware/async";
import { Request, Response, NextFunction } from "express";
import { deleteOne, createOne, getOne, getAll } from "./factoryFunction";
import AppError from "../utils/appError";
import { MembershipModel } from "../models/Membership";
// @desc    Get all memberships per owner
// @access  Private
// @route   GET /api/v1/memberships
export const getMemberships = getAll(Membership);

// @desc    Get meal by Id
// @access  Private
// @route   GET /api/v1/memberships/:id
export const getOneMembership = getOne(Membership);
// @desc    Add a new meal
// @access  Private
// @route   POST /api/v1/memberships
export const createMembership = createOne(Membership);

// @desc    Update a membership
// @access  Private
// @route   PUT /api/v1/meals/memberships/:id
export const updateMembership = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const membershipId = req?.params?.id;
  const ownerId = req?.user?.id;

  const doc = await (Membership as MembershipModel).decrementTrainingCountForUsers(membershipId, ownerId, 1);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({ success: true, data: doc });
});

// @desc    Delete a membership
// @access  Private
// @route   DELETE /api/v1/memberships/:id
export const deleteMembership = deleteOne(Membership);
