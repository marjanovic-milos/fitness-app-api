import catchAsync from "../middleware/async";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import AppError from "../utils/appError";
import { Request, Response } from "express";
import { Document } from "mongoose";

interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password?: string;
  role: string;
  correctPassword?: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginRequest extends Request<{}, {}, LoginRequestBody> {
  body: { email: string; password: string };
}

interface LogoutRequest extends Request {}

interface LoginResponse extends Response {}

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
  const token = signToken(user._id.toString());

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
export const signup = catchAsync(
  async (
    req: Request<{}, {}, SignupRequestBody>,
    res: Response,
    next: (err?: any) => void
  ): Promise<void> => {
    const { name, email, password, role } = req.body;
    const user: IUser = await User.create({
      name,
      email,
      password,
      role,
    });

    createSendToken(user, 200, req, res);
  }
);

export const login = catchAsync(
  async (
    req: LoginRequest,
    res: LoginResponse,
    next: (err?: any) => void
  ): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user: IUser | null = await User.findOne({ email }).select(
      "+password"
    );

    if (!user || !(await user.correctPassword?.(password, user.password!))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, req, res);
  }
);

export const logout = catchAsync(
  async (_req: LogoutRequest, res: LoginResponse): Promise<void> => {
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

export const getMe = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user?.id;
    const user: IUser | null = userId
      ? (await User.findById(userId)) || null
      : null;

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);
