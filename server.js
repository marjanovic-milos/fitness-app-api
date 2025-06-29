const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const errorHandler = require("./middleware/erorr");
const authRoutes = require("./routes/authRoutes");
const mealRoutes = require("./routes/mealRoutes");
dotenv.config({ path: "./.env" });

// Body parser
app.use(express.json());

const connectDB = require("./config/db");

app.use(errorHandler);

//assign routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/meal", mealRoutes);

connectDB();

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unahandled rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
