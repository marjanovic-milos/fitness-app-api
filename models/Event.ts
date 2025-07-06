import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
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

export default mongoose.model("Event", EventSchema);
