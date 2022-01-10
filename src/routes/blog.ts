import express from 'express';
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} from '../controllers/blog';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', addBlog);
router.get('/:id', getBlogById);
router.delete('/:id', deleteBlog);

export default router;
