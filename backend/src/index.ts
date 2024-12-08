import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db/db";
import newsRouter from "./routes/news.route";
import userRouter from "./routes/user.route";
import errorHandler from "./middlewares/errorHandler";
dotenv.config();
const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(cors());
app.use(errorHandler);
app.use(express.json());
db();

app.use("/api", newsRouter);
app.use("/api", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port} : http://localhost:${port}`);
});
