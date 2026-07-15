import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw createHttpError(401, 'Authentication required');
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch {
      throw createHttpError(401, 'Invalid or expired token');
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
