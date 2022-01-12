import express from 'express';
import 'express-async-errors';
import {
  addReadingList,
  updateReadByBlogId,
} from '../controllers/reading-list';
import { tokenExtractor } from '../utils/middleware/jwt';

const router = express.Router();

router.post('/', tokenExtractor, addReadingList);

router.put('/:id', tokenExtractor, updateReadByBlogId);

export default router;
