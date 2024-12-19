import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db/db";
import newsRouter from "./routes/news.route";
import userRouter from "./routes/user.route";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app: Application = express();

// Define the port to run the server
const port: number = Number(process.env.PORT) || 3000;

// Database connection
db();

// Middleware: Enable CORS with specific origins
app.use(
  cors({
    origin: [
      "https://twnewsdhanushbd.vercel.app",
      process.env.URL1 || "",
    ],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
  })
);

// Middleware: Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());
// preflight request
app.options("*", cors());
// Route handlers
app.use("/api", newsRouter);
app.use("/api", userRouter);

// Middleware: Global error handler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`);
});

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1); // Exit process to prevent undefined behavior
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
