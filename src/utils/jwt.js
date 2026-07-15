import jwt from 'jsonwebtoken';
import { getEnvVar } from './getEnvVar.js';

const JWT_SECRET = getEnvVar('JWT_SECRET', 'dev-secret-change-in-production');
const JWT_EXPIRES_IN = getEnvVar('JWT_EXPIRES_IN', '7d');

export const signToken = (userId) =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export const getCookieMaxAge = () => {
  const match = JWT_EXPIRES_IN.match(/^(\d+)([dhms])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000;
  const value = Number(match[1]);
  const unit = match[2];
  const multipliers = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
  return value * (multipliers[unit] ?? 86400000);
};
