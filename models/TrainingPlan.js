const mongoose = require("mongoose");

const TrainingPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  video: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },

  excercies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
});

module.exports = mongoose.model("TrainingPlan", TrainingPlanSchema);
