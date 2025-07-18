import express from "express";
const app = express();
import dotenv from "dotenv";
const port = process.env.PORT || 3000;

import errorHandler from "./middleware/erorr";
import authRoutes from "./routes/authRoutes";
import mealRoutes from "./routes/mealRoutes";
import excerciseRoutes from "./routes/excerciseRoutes";
import userRoutes from "./routes/userRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import AppError from "./utils/appError";
import { graphqlHTTP } from "express-graphql";

import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { schema } from "./index";

dotenv.config({ path: "./.env" });

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: {
      req,
      res,
    },
  }))
);

app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});

app.use(limiter);

// Body parser
app.use(express.json());

const connectDB = require("./config/db");

app.use(errorHandler);

//assign routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/excercises", excerciseRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventsRoutes);

connectDB();

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unahandled rejection! Shutting down...");
  if (err instanceof Error) {
    console.log(err.name, err.message);
  } else {
    console.log("Unknown error", err);
  }
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
