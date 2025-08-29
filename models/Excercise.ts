import mongoose from "mongoose";

const ExcerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    sourceUrl: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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

function getYoutubeId(url: String) {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

ExcerciseSchema.pre("save", function (next) {
  if (this.isModified("sourceUrl")) {
    const videoId = getYoutubeId(this.sourceUrl);
    if (videoId) {
      this.image = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }
  next();
});

export default mongoose.model("Excercise", ExcerciseSchema);
