import Blog from '../models/blog';
import { NewBlog } from '../types/blog';

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

const deleteBlog = async (id: number): Promise<boolean> => {
  const destroyedRows = await Blog.destroy({
    where: {
      id,
    },
  });
  return destroyedRows > 0;
};

export default {
  getAllBlogs,
  addBlog,
  getBlogById,
  deleteBlog,
};
