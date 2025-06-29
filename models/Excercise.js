const mongoose = require("mongoose");

const ExcerciseSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Excercise", ExcerciseSchema);
