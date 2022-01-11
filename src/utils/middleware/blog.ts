import { NextFunction, Request, Response } from 'express';
import { blogService } from '../../services';

const blogFinder = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (isNaN(Number(id)))
    throw { status: 400, message: 'Bad Request, id must be a number' };
  const blog = await blogService.getBlogById(Number(id));
  if (!blog) throw { status: 404, message: 'Blog not found' };
  req.blog = blog;
  next();
};

export { blogFinder };
