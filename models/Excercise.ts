import mongoose from "mongoose";

const ExcerciseSchema = new mongoose.Schema(
  {
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
    ownerId: {
      type: String,
      required: [true, "Please add an owner Id"],
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

export default mongoose.model("Excercise", ExcerciseSchema);
