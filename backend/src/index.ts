import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db/db";
import newsRouter from "./routes/news.route";
import userRouter from "./routes/user.route";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
dotenv.config();
const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(
  cors({
    origin: ["https://twnewsdhanushbd.vercel.app", process.env.URL1 || ""],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())
db();

app.use("/api", newsRouter);
app.use("/api", userRouter);
app.use(errorHandler); // Add error handler middleware
app.listen(port, () => {
  console.log(`Server is running on port ${port} : http://localhost:${port}`);
});
