const mongoose = require("mongoose");

const MealsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Meals", MealsSchema);
