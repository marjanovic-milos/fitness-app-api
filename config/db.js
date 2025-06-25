const mongoose = require("mongoose");

const connectDB = async () => {
  const mongo = await mongoose.connect(process.env.MONGO_DB, {});
  console.log(`MongoDB Connected: ${mongo.connection.host}`);
};

module.exports = connectDB;
