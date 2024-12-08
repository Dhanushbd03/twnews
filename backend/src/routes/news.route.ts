import { Router } from "express";
import {
  getAllNews,
  getNewsByCategory,
  NewsAuthors,
  NewsCategory,
  TopNews,
} from "../controllers/news.controller";

const router = Router();

router.get("/news", getAllNews);
router.get("/news/category", NewsCategory);
router.get("/news/authors", NewsAuthors);
router.get("/news/:category", getNewsByCategory);
router.get("/news/top", TopNews);
export default router;
