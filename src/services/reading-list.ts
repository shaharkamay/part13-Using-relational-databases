import { ReadingList } from '../models';
import { NewReadingList } from '../@types/reading-list';

const addReadingList = async (readingList: NewReadingList) => {
  const isExist = await ReadingList.findOne({ where: { ...readingList } });
  if (isExist != null)
    throw {
      status: 409,
      message: `This blog already exists in this user's reading list`,
    };

  const newReadingList = await ReadingList.create(readingList);
  return newReadingList;
};

const updateReadByBlogId = async (
  blogId: number,
  userId: number,
  read: boolean
) => {
  const readingList = await ReadingList.findOne({
    where: { blogId, userId },
  });

  if (!readingList)
    throw { status: 404, message: 'Reading list not found for this user' };

  readingList.set('read', read);
  await readingList.save();

  return readingList;
};

export default {
  addReadingList,
  updateReadByBlogId,
};
