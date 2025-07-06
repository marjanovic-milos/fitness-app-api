const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";

interface GetOnePopOptions {
  path: string;
  select?: string;
}

// Use the generic Mongoose Model type for any model
type ModelType = Model<Document>;

export const deleteOne =
  (Model: ModelType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // const doc = await Model.findByIdAndDelete(req.params.id);

    // if (!doc) {
    //   return next(new AppError("No document found with that ID", 404));
    // }

    // return res.status(204).json({
    //   status: "success",
    //   data: null,
    // });

    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const ownerId = req?.user?.id;
      const deleteDocument = await Model.findOneAndDelete({
        id,
        ownerId,
      });

      if (!deleteDocument) {
        return next(
          new AppError(
            "Document not found or you are not authorized to update it.",
            403
          )
        );
      }

      res.status(200).json({
        status: "success",
        data: {},
      });
    };
  };

export const updateOne =
  (Model: ModelType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    return res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };

export const createOne =
  (Model: ModelType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    return res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };

export const getOne =
  (Model: ModelType, popOptions?: GetOnePopOptions | string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      if (typeof popOptions === "string") {
        query = query.populate({ path: popOptions });
      } else {
        query = query.populate(popOptions);
      }
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    return res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  };

export const getAll =
  (Model: ModelType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    return res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  };
