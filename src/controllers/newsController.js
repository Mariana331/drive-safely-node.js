import createHttpError from 'http-errors';
import { News } from '../models/News.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getNews = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 6, 50);
    const category = req.query.category;
    const country = req.query.country;
    const search = req.query.search?.trim();

    const filter = { isPublished: true };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (country && country !== 'All Countries') {
      filter.country = country;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const [total, articles, categoryCounts] = await Promise.all([
      News.countDocuments(filter),
      News.find(filter)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      News.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
    ]);

    sendResponse(res, {
      data: {
        articles,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
        categoryCounts: categoryCounts.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
      },
    });
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
