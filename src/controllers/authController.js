import createHttpError from 'http-errors';
import { sendResponse } from '../utils/sendResponse.js';

const validateAuthBody = (body) => {
  const { email, password } = body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw createHttpError(400, 'Valid email is required');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    throw createHttpError(400, 'Password must be at least 6 characters');
  }
};

export const register = async (req, res, next) => {
  try {
    validateAuthBody(req.body);
    sendResponse(res, {
      message: 'Coming soon',
      data: { token: null, user: null },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    validateAuthBody(req.body);
    sendResponse(res, {
      message: 'Coming soon',
      data: { token: null, user: null },
    });
  } catch (error) {
    next(error);
  }
};
