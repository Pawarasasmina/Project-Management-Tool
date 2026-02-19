import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.MONGO_URI);
  logger.info('MongoDB connected');
};
