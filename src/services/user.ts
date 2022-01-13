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

const getUserById = async (id: number, read: boolean | null = null) => {
  const where = {} as { read: boolean };

  if (read != null) {
    where.read = read;
  }

  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt', 'admin', 'disabled'],
    },
    include: [
      {
        model: Blog,
        as: 'reading',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: { attributes: ['read', 'id'], where },
      },
    ],
  });
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

const getUserByUsername = async (username: string) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  return user;
};

const changeUserStatus = async (username: string, disabled: boolean) => {
  const user = await getUserByUsername(username);
  if (user) {
    user.set('disabled', disabled);
    await user.save();
    return user;
  }
  return false;
};

const isAdmin = async (id: number): Promise<boolean> => {
  const user = await getUserById(id);
  if (!user) throw { status: 404, message: 'Not found' };
  return user.get('admin') as boolean;
};

export default {
  getAllUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUsername,
  getUserByUsername,
  changeUserStatus,
  isAdmin,
};
