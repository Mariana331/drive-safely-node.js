import { Router } from 'express';
import { getNews, getNewsBySlug } from '../controllers/newsController.js';
import { register, login } from '../controllers/authController.js';
import { getHealth } from '../controllers/healthController.js';

const router = Router();

router.get('/health', getHealth);
router.get('/news', getNews);
router.get('/news/:slug', getNewsBySlug);
router.post('/auth/register', register);
router.post('/auth/login', login);

export default router;
