import { NextFunction, Request, Response } from 'express';
import blogService from '../services/blog';

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

const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) return next({ status: 400, message: 'Bad Request' });
    const blog = await blogService.getBlogById(Number(id));
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) return next({ status: 400, message: 'Bad Request' });
    const isDeleted = await blogService.deleteBlog(Number(id));
    res.json({ isDeleted });
  } catch (error) {
    next(error);
  }
};

export { getAllBlogs, addBlog, getBlogById, deleteBlog };
