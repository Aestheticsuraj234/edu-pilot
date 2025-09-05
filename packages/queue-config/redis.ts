import {ConnectionOptions} from "bullmq";
import dotenv from "dotenv";

dotenv.config();

export const redisConfig: ConnectionOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: 3,
};

export const queueConfigs = {
  'text-processing': {
    connection: redisConfig,
    defaultJobOptions: {
      removeOnComplete: 50,
      removeOnFail: 20,
      attempts: 3,
      backoff: { type: 'exponential' as const, delay: 2000 },
    }
  },
  'media-processing': {
    connection: redisConfig, 
    defaultJobOptions: {
      removeOnComplete: 10,
      removeOnFail: 5,
      attempts: 2,
      backoff: { type: 'exponential' as const, delay: 5000 },
    }
  },
  'gpu-intensive': {
    connection: redisConfig,
    defaultJobOptions: {
      removeOnComplete: 5,
      removeOnFail: 3,
      attempts: 1, // Expensive GPU operations
      delay: 1000,
    }
  }
};