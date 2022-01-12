import express, { Request, Response } from 'express';
import 'express-async-errors';
import { ReadingList } from '../models';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { blog_id, user_id } = req.body;
  const readingList = await ReadingList.create({
    blogId: blog_id,
    userId: user_id,
  });
  res.json(readingList);
});

export default router;
