import { Request, Response } from 'express';
import { userService } from '../services';

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

export { getAllUsers, addUser, getUserById, deleteUser, updateUsername };
