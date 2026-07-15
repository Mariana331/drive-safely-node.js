import { Router } from 'express';
import { getNews, getNewsBySlug } from '../controllers/newsController.js';
import {
  register,
  login,
  logout,
  getMe,
} from '../controllers/authController.js';
import { getHealth } from '../controllers/healthController.js';
import { getProfile } from '../controllers/profileController.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.get('/health', getHealth);
router.get('/news', getNews);
router.get('/news/:slug', getNewsBySlug);

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', authenticate, getMe);

router.get('/users/me/profile', authenticate, getProfile);

export default router;
