import { Request, Response } from 'express';
import { blogService } from '../services';

const getAllBlogs = async (_req: Request, res: Response) => {
  const blogs = await blogService.getAllBlogs();
  res.json(blogs);
};

const addBlog = async (req: Request, res: Response) => {
  const blog = await blogService.addBlog(req.body);
  res.status(201).json(blog);
};

const getBlogById = (req: Request, res: Response) => {
  res.json(req.blog);
};

const deleteBlog = async (req: Request, res: Response) => {
  const isDeleted = await blogService.deleteBlog(req.blog);
  if (isDeleted) res.status(204).end();
};

const updateLikes = async (req: Request, res: Response) => {
  const { likes } = req.body;
  if (isNaN(likes))
    throw { status: 400, message: 'Bad Request, likes must be a number' };
  const isUpdated = await blogService.updateLikes(req.blog, likes);
  res.json({ isUpdated });
};

export { getAllBlogs, addBlog, getBlogById, deleteBlog, updateLikes };
