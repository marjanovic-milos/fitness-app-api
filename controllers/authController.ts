import catchAsync from "../middleware/async";
import User from "../models/User";
import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { IUser } from "../types";
import AppError from "../utils/appError";

import { getOne, createOne } from "./factoryFunction";

const signToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
  if (!jwtExpiresIn) {
    throw new Error("JWT_EXPIRES_IN environment variable is not defined");
  }
  return jwt.sign({ id }, jwtSecret as any, {
    expiresIn: jwtExpiresIn as any,
  });
};

const createSendToken = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response
): void => {
  const token = signToken(user.id.toString());

  res.cookie("jwt", token, {
    expires: new Date(24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// @desc    Sugnup a new user
// @route   POST /api/v1/auth/signup
// @access  Public
export const signup = createOne(User);

// @desc    Login a new user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword?.(password, user.password!))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, req, res);
  }
);
// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Public
export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "node", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);

// @desc    GET current user
// @route   GET /api/v1/auth/getMe
// @access  Private

export const getMe = getOne(User);
