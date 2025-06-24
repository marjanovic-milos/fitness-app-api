const mongoose = require("mongoose");

const SchedulerSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  mealPlan: {
    type: mongoose.Schema.ObjectId,
    ref: "MealPlan",
    required: true,
  },
  trainingPlan: {
    type: mongoose.Schema.ObjectId,
    ref: "TrainingPlan",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  entity: {
    type: String,
    required: false,
  },
  mealPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Training",
  },
});

module.exports = mongoose.model("Scheduler", SchedulerSchema);
