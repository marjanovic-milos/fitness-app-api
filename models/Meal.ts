import mongoose from "mongoose";

const MealSchema = new mongoose.Schema(
  {
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
      // required: [true, "Please add an image URL"],
    },
    spoonacularId: {
      type: Number,
      // required: [true, "Please add a Spoonacular ID"],
    },
    sourceUrl: {
      type: String,
      required: [true, "Please add a source URL"],
    },
    ownerId: {
      type: String,
      required: [true, "Please add an owner Id "],
    },
    protein: {
      type: Number,
      required: [true, "Please add protein value"],
    },
    calories: {
      type: Number,
      required: [true, "Please add calories value"],
    },
    fat: {
      type: Number,
      required: [true, "Please add fat value"],
    },
    carbs: {
      type: Number,
      required: [true, "Please add carbs calue"],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model("Meal", MealSchema);
