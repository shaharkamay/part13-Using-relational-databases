import { Request, Response } from 'express';
import { blogService } from '../services';

const getAllAuthors = async (req: Request, res: Response) => {
  const authors = await blogService.getAllAuthors();
  res.json(authors);
};

export { getAllAuthors };
