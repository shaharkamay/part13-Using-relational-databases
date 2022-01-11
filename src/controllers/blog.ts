import { Request, Response } from 'express';
import { blogService, userService } from '../services';

const getAllBlogs = async (req: Request, res: Response) => {
  const { search } = req.query;
  const blogs = await blogService.getAllBlogs(search as string | undefined);
  res.json(blogs);
};

const addBlog = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.decodedToken.id);
  if (!user) throw { status: 404, message: 'User not found' };
  const blog = await blogService.addBlog(req.body, user);
  res.status(201).json(blog);
};

const getBlogById = (req: Request, res: Response) => {
  res.json(req.blog);
};

const deleteBlog = async (req: Request, res: Response) => {
  if (req.decodedToken.id !== req.blog.get('userId'))
    throw {
      status: 403,
      message: 'Cannot delete blog that does not belong to logged user',
    };
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
