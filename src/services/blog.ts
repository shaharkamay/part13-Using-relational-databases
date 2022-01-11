import { Blog, User } from '../models';
import { NewBlog } from '../@types/blog';

const getAllBlogs = async () => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });
  return blogs;
};

const addBlog = async (blog: NewBlog, user: User) => {
  const newBlog = await Blog.create({ ...blog, userId: user.get('id') });
  return newBlog;
};

const getBlogById = async (id: number) => {
  const blog = await Blog.findByPk(id);
  return blog;
};

const deleteBlog = async (blog: Blog): Promise<boolean> => {
  await blog.destroy();
  return true;
};

const updateLikes = async (blog: Blog, likes: number): Promise<boolean> => {
  blog.set('likes', likes);
  await blog.save();
  return true;
};

export default {
  getAllBlogs,
  addBlog,
  getBlogById,
  deleteBlog,
  updateLikes,
};
