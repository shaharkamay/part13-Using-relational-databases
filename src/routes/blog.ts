import express from 'express';
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateLikes,
} from '../controllers/blog';
import { blogFinder } from '../utils/middleware/blog';
import 'express-async-errors';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', addBlog);
router.get('/:id', blogFinder, getBlogById);
router.delete('/:id', blogFinder, deleteBlog);
router.put('/:id', blogFinder, updateLikes);

export default router;
