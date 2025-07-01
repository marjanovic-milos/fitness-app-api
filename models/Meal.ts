import mongoose from "mongoose";

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
  ownerId: {
    type: String,
    required: [true, "Please add an owner Id "],
  },
});

export default mongoose.model("Meal", MealSchema);
