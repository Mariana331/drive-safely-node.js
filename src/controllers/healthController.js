import mongoose from 'mongoose';
import { sendResponse } from '../utils/sendResponse.js';

export const getHealth = (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

  sendResponse(res, {
    data: { status: 'ok', db: dbStatus },
  });
};
