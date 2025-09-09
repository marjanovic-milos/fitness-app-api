import catchAsync from "../middleware/async";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";
import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";

interface GetOnePopOptions {
  path?: string;
  select?: string;
  ownerKey?: string;
}

export const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const ownerId = req?.user?.id;
    const doc = await Model.findOneAndDelete({
      _id: id,
      ownerId,
    });
    if (!doc) {
      return next(new AppError("Document not found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {},
    });
  });

export const updateOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const ownerId = req?.user?.id;
    const doc = await Model.findOneAndUpdate({ _id: id, ownerId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("Document not found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const createOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req?.user?.id;
    const doc = await Model.create({ ...req.body, ownerId });
    if (!doc) {
      return next(new AppError("Document not found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getOne = (Model: any, options?: GetOnePopOptions | string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const ownerId = req?.user?.id;
    let query = await Model.find({ _id: id, ownerId });
    if (options) query = query.populate(options);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({ success: true, data: doc });
  });

export const getAll = (Model: any, options?: GetOnePopOptions | string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req?.user?.id;
    let filter: { [key: string]: any } = { ownerId };

    if (
      options &&
      typeof options === "object" &&
      "ownerKey" in options &&
      options.ownerKey
    ) {
      filter = { [options.ownerKey]: ownerId };
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .limitFields()
      .sort();

    await features.countTotal();
    features.paginate();

    const doc = await features.query;

    if (!doc || doc.length === 0) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      results: doc.length,
      totalCount: features.totalCount,
      totalPages: Math.ceil(
        (features.totalCount as number) /
          (req.query.limit ? +req.query.limit : (features.totalCount as number))
      ),
      data: doc,
    });
  });
