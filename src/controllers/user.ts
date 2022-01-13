import { Request, Response } from 'express';
import { sessionService, userService } from '../services';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

const addUser = async (req: Request, res: Response) => {
  const user = await userService.addUser(req.body);
  res.status(201).json(user);
};

const getUserById = (req: Request, res: Response) => {
  res.json(req.user);
};

const deleteUser = async (req: Request, res: Response) => {
  const isDeleted = await userService.deleteUser(req.user);
  if (isDeleted) res.status(204).end();
};

const updateUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const isUpdated = await userService.updateUsername(
    username,
    req.decodedToken.id
  );
  res.json({ isUpdated });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await userService.getUserByUsername(username);

  const passwordCorrect = password === 'secret';
  if (!(user && passwordCorrect)) {
    throw { status: 401, message: 'invalid username or password' };
  }

  if (user.get('disabled')) {
    throw { status: 401, message: 'Account disabled, please contact admin' };
  }

  const userForToken = {
    username: user.get('username'),
    id: user.get('id'),
  };

  const token = jwt.sign(userForToken, config.secret, {
    expiresIn: config.accessTime,
  });

  await sessionService.addSession({
    userId: Number(user.get('id')),
    token,
  });

  res
    .status(200)
    .send({ token, username: user.get('username'), name: user.get('name') });
};

const logout = async (req: Request, res: Response) => {
  await sessionService.deleteSession(req.decodedToken.id);
  res.status(204).end();
};

export {
  getAllUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUsername,
  login,
  logout,
};
