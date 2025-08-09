import catchAsync from "../middleware/async";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";
import { Request, Response, NextFunction } from "express";
interface GetOnePopOptions {
  path: string;
  select?: string;
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

    const data = new APIFeatures(Model.find({ ownerId }), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();

    const doc = await data.query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
