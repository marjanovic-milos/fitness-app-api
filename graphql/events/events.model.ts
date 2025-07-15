import Event from "../../models/Event";
import catchAsync from "../../middleware/async";
import { Request, Response, NextFunction } from "express";
import { currentWeek } from "../../utils/dateUtils";

const getAllEvents = catchAsync(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const { last3Days, next3Days } = currentWeek();
    const events = await Event.find({
      date: {
        $gte: last3Days,
        $lte: next3Days,
      },
    })
      .populate("mealPlans")
      .populate("excercisePlans")
      .lean();

    _res.json(events);
  }
);

module.exports = {
  getAllEvents,
};
