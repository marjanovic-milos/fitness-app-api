import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_DB;
  if (!mongoUri) {
    throw new Error("MONGO_DB environment variable is not defined");
  }
  const mongo = await mongoose.connect(mongoUri, {});
  console.log(`MongoDB Connected: ${mongo.connection.host}`);
};

module.exports = connectDB;
