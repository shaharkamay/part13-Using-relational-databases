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
import { tokenExtractor } from '../utils/middleware/jwt';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', tokenExtractor, addBlog);
router.get('/:id', blogFinder, getBlogById);
router.delete('/:id', tokenExtractor, blogFinder, deleteBlog);
router.put('/:id', blogFinder, updateLikes);

export default router;
