import { Blog, User } from '../models';
import { NewUser } from '../@types/user';

const getAllUsers = async () => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  return users;
};

const addUser = async (user: NewUser) => {
  const newUser = await User.create(user);
  return newUser;
};

const getUserById = async (id: number) => {
  const user = await User.findByPk(id);
  return user;
};

const deleteUser = async (user: User): Promise<boolean> => {
  await user.destroy();
  return true;
};

const updateUsername = async (
  username: string,
  id: number
): Promise<boolean> => {
  const user = await User.findByPk(id);
  if (!user) throw { status: 404, message: 'Not found' };
  user.set('username', username);
  await user.save();
  return true;
};

export default {
  getAllUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUsername,
};
