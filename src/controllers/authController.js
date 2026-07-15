import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import {
  User,
  defaultAchievements,
  defaultSkills,
  toPublicUser,
} from '../models/User.js';
import { sendResponse } from '../utils/sendResponse.js';
import { signToken } from '../utils/jwt.js';
import { setAuthCookie, clearAuthCookie } from '../utils/authCookie.js';

const validateRegisterBody = (body) => {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    country,
    experienceLevel,
    agreeToTerms,
  } = body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    throw createHttpError(400, 'Full name is required');
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw createHttpError(400, 'Valid email is required');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    throw createHttpError(400, 'Password must be at least 6 characters');
  }

  if (password !== confirmPassword) {
    throw createHttpError(400, 'Passwords do not match');
  }

  if (!dateOfBirth) {
    throw createHttpError(400, 'Date of birth is required');
  }

  if (!country || typeof country !== 'string') {
    throw createHttpError(400, 'Country is required');
  }

  if (!['new', 'experienced', 'professional'].includes(experienceLevel)) {
    throw createHttpError(400, 'Experience level is required');
  }

  if (!agreeToTerms) {
    throw createHttpError(400, 'You must agree to the terms');
  }
};

const validateLoginBody = (body) => {
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
    validateRegisterBody(req.body);

    const existing = await User.findOne({ email: req.body.email.toLowerCase() });
    if (existing) {
      throw createHttpError(409, 'Email already registered');
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      fullName: req.body.fullName.trim(),
      email: req.body.email.toLowerCase(),
      passwordHash,
      dateOfBirth: new Date(req.body.dateOfBirth),
      country: req.body.country,
      driverLicense: req.body.driverLicense?.trim() ?? '',
      experienceLevel: req.body.experienceLevel,
      location: req.body.country,
      safetyScore: 50,
      xp: 0,
      level: 'Beginner',
      stats: {
        videosAnalyzed: 0,
        videosAnalyzedMonthly: 0,
        rulesLearned: 0,
        rulesLearnedMonthly: 0,
        testsCompleted: 0,
        testsCompletedMonthly: 0,
        aiQuestions: 0,
        aiQuestionsMonthly: 0,
        achievementsCount: 0,
        achievementsNew: 0,
      },
      skills: defaultSkills(),
      achievements: defaultAchievements(),
      streak: { current: 1, lastActiveDate: new Date() },
      activity: [
        {
          type: 'welcome',
          text: 'Welcome to DriveSafely! Start your journey today.',
          createdAt: new Date(),
        },
      ],
    });

    const token = signToken(user._id.toString());
    setAuthCookie(res, token);

    sendResponse(res, {
      message: 'Account created successfully',
      data: { user: toPublicUser(user) },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    validateLoginBody(req.body);

    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!isMatch) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const token = signToken(user._id.toString());
    setAuthCookie(res, token);

    sendResponse(res, {
      message: 'Logged in successfully',
      data: { user: toPublicUser(user) },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  sendResponse(res, { message: 'Logged out successfully' });
};

export const getMe = (req, res) => {
  sendResponse(res, {
    data: { user: toPublicUser(req.user) },
  });
};
