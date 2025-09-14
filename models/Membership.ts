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

MembershipSchema.statics.decrementTrainingCountForUsers = async function (userIds: string | string[], ownerId: string, decrementBy = 1) {
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
      results.push({ id, status: "skipped", reason: "Not enough training count" });
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
