import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    assignedTrainner: {
      type: String,
      required: [true, "Please add an assigned trainner"],
    },
    role: {
      type: String,
      enum: ["client", "trainer"],
      default: "client",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
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

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

export interface IUser extends Document {
  name: string;
  email: string;
  role: "client" | "trainer";
  password: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

UserSchema.methods.correctPassword = async function (
  this: IUser,
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};
export default mongoose.model("User", UserSchema);
