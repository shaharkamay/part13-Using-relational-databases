import { Request, Response } from 'express';
import { readingListService } from '../services';

const addReadingList = async (req: Request, res: Response) => {
  const { blog_id: blogId } = req.body;
  const userId = req.decodedToken.id;
  if (isNaN(blogId) || userId == undefined)
    throw { status: 400, message: 'Bad request' };

  const readingList = await readingListService.addReadingList({
    blogId,
    userId,
  });
  res.json(readingList);
};

const updateReadByBlogId = async (req: Request, res: Response) => {
  const { read } = req.body;
  const { id: blogId } = req.params;
  const { id: userId } = req.decodedToken;
  if (typeof read !== 'boolean' || isNaN(Number(blogId)))
    throw { status: 400, message: 'Bad request' };

  const readingList = await readingListService.updateReadByBlogId(
    Number(blogId),
    userId,
    read
  );
  res.json(readingList);
};

export { addReadingList, updateReadByBlogId };
