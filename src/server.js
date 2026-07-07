import express from 'express';
import pino from 'pino-pretty';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar';

dotenv.config();

const PORT = Number(getEnvVar('PORT', 3002));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found!' });
  });

  app.use((req, res) => {
    res.status(500).json({ message: 'Something went wrong!' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
