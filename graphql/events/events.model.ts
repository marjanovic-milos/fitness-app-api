import Event from "../../models/Event";
import catchAsync from "../../middleware/async";
import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";

const currentWeek = () => {
  const last3Days = dayjs().subtract(3, "day").format("YYYY-MM-DD");
  const next3Days = dayjs().add(3, "day").format("YYYY-MM-DD");
  return { last3Days, next3Days };
};

const getAllEvents = async (req: any, res: any, next: any) => {
  console.log(req, res);
  try {
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
    console.log("Events fetched:", events);
    return events;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  getAllEvents,
};
