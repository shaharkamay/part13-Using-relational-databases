import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');
  if (!(authorization && authorization.toLowerCase().startsWith('bearer ')))
    throw { status: 401, message: 'Token missing' };
  try {
    req.decodedToken = jwt.verify(
      authorization.substring(7),
      config.secret
    ) as JwtPayload;
  } catch (error) {
    throw { status: 401, message: 'Invalid token' };
  }
  next();
};

export { tokenExtractor };
