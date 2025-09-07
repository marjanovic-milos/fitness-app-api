import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },

    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    // Instead of single client → array of clients
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    ownerId: {
      type: String,
      required: false,
    },

    status: {
      type: Boolean,
      default: false,
    },

    mealPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
      },
    ],

    excercisePlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Excercise",
      },
    ],

    // Repeating pattern: store weekdays (0 = Sunday, 6 = Saturday)
    repeatDays: {
      type: [Number],
      enum: [0, 1, 2, 3, 4, 5, 6], // optional validation
      default: [], // empty → no repeating
    },

    // Training type (derived field, optional)
    trainingType: {
      type: String,
      enum: ["personal", "group"],
      default: "personal",
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

EventSchema.pre("save", function (next) {
  if (this.clients && this.clients.length > 1) {
    this.trainingType = "group";
  } else {
    this.trainingType = "personal";
  }
  next();
});

export default mongoose.model("Event", EventSchema);
