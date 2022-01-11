import express from 'express';
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} from '../controllers/blog';
import { blogFinder } from '../middleware/blog';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', addBlog);
router.get('/:id', blogFinder, getBlogById);
router.delete('/:id', blogFinder, deleteBlog);

export default router;
