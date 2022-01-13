import express from 'express';
import 'express-async-errors';
import {
  addReadingList,
  updateReadByBlogId,
} from '../controllers/reading-list';

const router = express.Router();

router.post('/', addReadingList);

router.put('/:id', updateReadByBlogId);

export default router;
