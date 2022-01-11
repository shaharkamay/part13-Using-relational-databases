import { NextFunction, Request, Response } from 'express';
import { blogService } from '../services';

const getAllBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const addBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await blogService.addBlog(req.body);
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

const getBlogById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = req.blog;
    if (!blog) return next({ status: 404, message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = req.blog;
    if (!blog) return next({ status: 404, message: 'Blog not found' });
    await blogService.deleteBlog(blog);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export { getAllBlogs, addBlog, getBlogById, deleteBlog };
