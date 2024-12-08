import { Request, Response } from "express";
import News from "../models/news.model";
import { constants } from "../../constants";
import errorHandler from "../middlewares/errorHandler";

// get all the news
export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await News.find().limit(10);
    if (!news.length) {
      throw new Error(constants.NO_NEWS_FOUND);
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};

// get the categories of the news
export const NewsCategory = async (req: Request, res: Response) => {
  try {
    const categories = await News.distinct("category");
    if (!categories.length) {
      throw new Error("No categories found");
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};

export const getNewsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const news = await News.find({ category });
    if (!news.length) {
      throw new Error(constants.NO_NEWS_FOUND);
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};

// get the authors of the news
export const NewsAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await News.distinct("authors");
    if (!authors.length) {
      throw new Error("No authors found");
    }
    res.status(200).json(authors.slice(0, 10));
  } catch (error) {
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};

export const TopNews = async (req: Request, res: Response) => {
  try {
    const news = await News.aggregate([
      {
        $group: {
          _id: "$category",
          data: { $first: "$$ROOT" },
        },
      },
      {
        $limit: 20,
      },
      {
        $replaceRoot: { newRoot: "$data" },
      },
    ]);

    if (!news.length) {
      throw new Error(constants.NO_NEWS_FOUND);
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};
