import { Blog } from '../models';
import { NewBlog } from '../@types/blog';

const getAllBlogs = async () => {
  const blogs = await Blog.findAll();
  return blogs;
};

const addBlog = async (blog: NewBlog) => {
  const newBlog = await Blog.create(blog);
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

export default {
  getAllBlogs,
  addBlog,
  getBlogById,
  deleteBlog,
};
