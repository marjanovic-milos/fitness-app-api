import catchAsync from "./async";
import jwt from "jsonwebtoken";

import User from "../models/User";
import AppError from "../utils/appError";

import { IUser } from "../models/User"; // Adjust import if your User model exports an interface/type

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

export const protect = catchAsync(async (req, res, next) => {
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token, "token");
  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Your token has expired! Please log in again.", 401));
    }
    return next(new AppError("Invalid token. Please log in again.", 401));
  }

  let userId: string | undefined;
  if (typeof decoded === "string") {
    return next(new AppError("Invalid token payload.", 401));
  } else {
    userId = (decoded as jwt.JwtPayload).id;
  }

  const currentUser = await User.findById(userId);
  if (!currentUser) {
    return next(new AppError("The user belonging to this token does no longer exist.", 401));
  }

  req.user = currentUser as unknown as IUser;
  res.locals.user = currentUser;
  next();
});

import { Request } from "express";

interface AuthorizeRequest extends Request {
  user?: IUser;
}

type Role = string;

interface AuthorizeMiddleware {
  (req: AuthorizeRequest, res: import("express").Response, next: import("express").NextFunction): void;
}

export const authorize = (...roles: Role[]): AuthorizeMiddleware => {
  return (req, res, next) => {
    if (!roles.includes((req.user as IUser).role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }

    next();
  };
};
