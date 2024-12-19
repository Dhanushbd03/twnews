import mongoose from "mongoose";

export const db = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
    console.log(process.env.MONGO_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};