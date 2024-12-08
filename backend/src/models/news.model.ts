import mongoose, { Schema, Document } from "mongoose";

// Interface extending Document to include Mongoose document properties
interface INews extends Document {
  link: string;
  headline: string;
  category: string;
  short_description: string;
  authors: string;
  date: string;
   // Changed to string to match the provided date format
}

// Define the schema with all fields as required
const NewsSchema: Schema = new Schema({
  link: { type: String, required: true },
  headline: { type: String, required: true },
  category: { type: String, required: true },
  short_description: { type: String, required: true },
  authors: { type: String, required: true },
  date: { type: String, required: true }, // Changed to string to match the provided date format
}, { timestamps: true });

// Create the model from the schema
const News = mongoose.model<INews>("News", NewsSchema);

export default News;
