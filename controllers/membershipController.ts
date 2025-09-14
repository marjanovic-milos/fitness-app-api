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

export const updateMembership = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const idsQuery: any = req.params.ids;

  const ids = idsQuery
    ?.replace(/^ids=/, "")
    ?.split(",")
    ?.map((id: string) => id.trim());

  if (!ids) {
    return next(new AppError("No membership id(s) provided", 400));
  }

  const ownerId = req.user?.id;
  if (!ownerId) {
    return next(new AppError("Unauthorized: owner ID missing", 401));
  }

  const result = await (Membership as MembershipModel).decrementTrainingCountForUsers(ids, ownerId, 1);

  if (!result || (Array.isArray(result) && result.length === 0)) {
    return next(new AppError("No document found with that ID(s)", 404));
  }

  res.status(200).json({
    success: true,
    data: result,
  });
});

// @desc    Delete a membership
// @access  Private
// @route   DELETE /api/v1/memberships/:id
export const deleteMembership = deleteOne(Membership);
