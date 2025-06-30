const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add an title"],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
    required: [true, "Please add an image URL"],
  },
  spoonacularId: {
    type: Number,
    required: [true, "Please add a Spoonacular ID"],
  },
  sourceUrl: {
    type: String,
    required: [true, "Please add a source URL"],
  },
});

module.exports = mongoose.model("Meal", MealSchema);
