const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  sourceUrl: {
    type: String,
    required: [true, "Please add a name"],
  },
  image: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Meal", MealSchema);
