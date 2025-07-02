import mongoose from "mongoose";

const SchedulerSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  client: {
    type: String,
    required: true,
  },
  trainer: {
    type: String,
    required: false,
  },

  status: {
    type: Boolean,
    default: false,
  },

  mealPlans: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Meals",
  },
  excercisePlans: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Excercise",
  },
});

export default mongoose.model("Scheduler", SchedulerSchema);
