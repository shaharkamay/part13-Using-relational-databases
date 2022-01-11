import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3001,
  dbUrl: process.env.DATABASE_URL || '',
};
