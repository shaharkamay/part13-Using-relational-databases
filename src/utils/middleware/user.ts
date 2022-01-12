import { NextFunction, Request, Response } from 'express';
import { userService } from '../../services';

const userFinder = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (isNaN(Number(id)))
    throw { status: 400, message: 'Bad Request, id must be a number' };
  const user = await userService.getUserById(Number(id));
  if (!user) throw { status: 404, message: 'User not found' };
  req.user = user;
  next();
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.decodedToken.id)
    throw {
      status: 403,
      message: 'Cannot delete blog that does not belong to logged user',
    };

  const isAdmin = await userService.isAdmin(req.decodedToken.id);
  req.isAdmin = isAdmin;
  next();
};

export { userFinder, isAdmin };
