import { NextFunction, Request, Response } from 'express';
import { sessionService, userService } from '../../services';
import { tokenExtractor } from '../helpers/jwt';

const userFinder = async (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { read: readQuery } = req.query;

  let read = null;
  if (readQuery != null)
    read = readQuery === 'true' ? true : readQuery === 'false' ? false : null;

  if (isNaN(Number(id)))
    throw { status: 400, message: 'Bad Request, id must be a number' };
  const user = await userService.getUserById(Number(id), read);
  if (!user) throw { status: 404, message: 'User not found' };
  req.user = user;
  next();
};

const isAdmin = async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.decodedToken.id)
    throw {
      status: 403,
      message: 'Cannot delete blog that does not belong to logged user',
    };

  const isAdmin = await userService.isAdmin(req.decodedToken.id);
  req.isAdmin = isAdmin;
  next();
};

const isSessionActive = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorization = req.get('authorization');
  if (authorization == null) throw { status: 401, message: 'Token missing' };

  req.decodedToken = tokenExtractor(authorization);

  const session = await sessionService.getSessionByUserId(req.decodedToken.id);
  if (session == null) throw { status: 401, message: 'Unauthorized' };

  if (session.get('token') !== authorization.substring(7)) {
    await sessionService.deleteSession(req.decodedToken.id);
    throw { status: 401, message: 'Unmatched tokens' };
  }
  next();
};

export { userFinder, isAdmin, isSessionActive };
