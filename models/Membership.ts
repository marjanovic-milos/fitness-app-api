import mongoose, { Model } from "mongoose";
import dayjs from "dayjs";

interface MembershipDoc extends Document {
  createdAt: Date;
  expiryDate?: Date;
  trainingCount: number;
  ownerId: string;
  userId: string | string[];
  decrementTrainingCountForUsers: void;
}

export interface MembershipModel extends Model<MembershipDoc> {
  decrementTrainingCountForUsers(userIds: string | string[], ownerId: string, decrementBy?: number): Promise<MembershipDoc | null>;
}

const MembershipSchema = new mongoose.Schema<MembershipDoc>(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
    },

    trainingCount: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: String,
      required: [true, "Please add an owner Id "],
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
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

MembershipSchema.pre("save", function (next) {
  if (!this.expiryDate) {
    this.expiryDate = dayjs(this.createdAt).add(1, "month").toDate();
  }

  next();
});

// MembershipSchema.statics.decrementTrainingCount = async function (membershipId: string, ownerId: string, decrementBy = 1) {
//   return this.findOneAndUpdate(
//     { _id: membershipId, ownerId }, // match by ID and ownerId
//     { $inc: { trainingCount: -decrementBy } },
//     { new: true }
//   );
// };

MembershipSchema.statics.decrementTrainingCountForUsers = async function (userIds: string | string[], ownerId: string, decrementBy = 1) {
  // Normalize to array
  const ids = Array.isArray(userIds) ? userIds : [userIds];

  if (ids.length === 0) return;

  return this.updateMany(
    {
      userId: { $in: ids },
      ownerId,
      trainingCount: { $gte: decrementBy }, // Optional: skip if not enough
    },
    {
      $inc: { trainingCount: -decrementBy },
    }
  );
};

export default mongoose.model("Membership", MembershipSchema);
