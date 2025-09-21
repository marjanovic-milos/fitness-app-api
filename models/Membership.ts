import mongoose, { Model } from "mongoose";
import dayjs from "dayjs";
import AppError from "../utils/appError";
interface MembershipDoc extends Document {
  createdAt: Date;
  expiryDate?: Date;
  trainingCount: number;
  ownerId: string;
  userId: string | string[];
  price: number;
  active: Boolean;
  decrementTrainingCountForUsers: void;
}

export interface MembershipModel extends Model<MembershipDoc> {
  decrementTrainingCountForUsers(
    userIds: string | string[],
    ownerId: string,
    decrementBy?: number
  ): Promise<MembershipDoc | null>;
}

const MembershipSchema = new mongoose.Schema<MembershipDoc>(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
      default: null,
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
    price: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
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
    const rangeStart = dayjs(Date.now()).startOf("day");
    const rangeEnd = rangeStart.add(1, "month").endOf("month");
    this.expiryDate = rangeEnd.toDate();
  }

  next();
});

MembershipSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next(); // skip for updates
  }
  const Membership = mongoose.model("Membership", MembershipSchema);

  const existing = await Membership.findOne({
    userId: this.userId,
    ownerId: this.ownerId,
    active: true,
    expiryDate: { $gte: new Date() },
  });

  if (existing) {
    return next(
      new AppError("User already has an active membership with this owner", 409)
    );
  }

  next();
});

MembershipSchema.statics.decrementTrainingCountForUsers = async function (
  userIds: string | string[],
  ownerId: string,
  decrementBy = 1
) {
  const now = new Date();

  const results: {
    id: string;
    status: "updated" | "skipped";
    reason?: string;
    trainingCount?: number;
  }[] = [];

  for (const id of userIds) {
    const membership = await this.findOne({ userId: id, ownerId });

    if (!membership) {
      results.push({ id, status: "skipped", reason: "Membership not found" });
      continue;
    }

    if (membership.expiryDate && membership.expiryDate < now) {
      results.push({ id, status: "skipped", reason: "Membership expired" });
      continue;
    }

    if (membership.trainingCount < decrementBy) {
      results.push({
        id,
        status: "skipped",
        reason: "Not enough training count",
      });
      continue;
    }

    membership.trainingCount -= decrementBy;
    await membership.save();

    results.push({
      id,
      status: "updated",
      trainingCount: membership.trainingCount,
    });
  }

  return results;
};

export default mongoose.model("Membership", MembershipSchema);
