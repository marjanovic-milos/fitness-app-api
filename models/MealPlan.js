const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

module.exports = mongoose.model("MealPlan", MealPlanSchema);
