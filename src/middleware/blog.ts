import { NextFunction, Request, Response } from 'express';
import { blogService } from '../services';

const blogFinder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) return next({ status: 400, message: 'Bad Request' });
    const blog = await blogService.getBlogById(Number(id));
    if (blog) req.blog = blog;
    next();
  } catch (error) {
    next(error);
  }
};

export { blogFinder };
