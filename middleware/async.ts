import { Request, Response, NextFunction, RequestHandler } from "express";

interface AsyncHandler {
  (fn: RequestHandler): RequestHandler;
}

const asyncHandler: AsyncHandler =
  (fn) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
