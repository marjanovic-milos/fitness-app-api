import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
      // required: [true, "Please add an image URL"],
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
    ownerId: {
      type: String,
      required: function (this: IUser) {
        return !this.password && !this.hasAuth;
      },
    },
    role: {
      type: String,
      enum: ["client", "trainer"],
      default: "client",
    },
    hasAuth: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
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
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
    this.hasAuth = true;
  }
  next();
});

export interface IUser extends Document {
  name: string;
  email: string;
  role: "client" | "trainer";
  password: string;
  hasAuth: Boolean;
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
