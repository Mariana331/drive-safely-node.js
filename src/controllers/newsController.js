import createHttpError from 'http-errors';
import { News } from '../models/News.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getNews = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
    const articles = await News.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    sendResponse(res, { data: { articles } });
  } catch (error) {
    next(error);
  }
};

export const getNewsBySlug = async (req, res, next) => {
  try {
    const article = await News.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).lean();

    if (!article) {
      throw createHttpError(404, 'Article not found');
    }

    sendResponse(res, { data: { article } });
  } catch (error) {
    next(error);
  }
};
