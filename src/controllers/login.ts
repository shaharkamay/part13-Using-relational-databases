import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../utils/config';
import { User } from '../models';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  const passwordCorrect = password === 'secret';
  if (!(user && passwordCorrect)) {
    throw { status: 401, message: 'invalid username or password' };
  }

  const userForToken = {
    username: user.get('username'),
    id: user.get('id'),
  };

  const token = jwt.sign(userForToken, config.secret);

  res
    .status(200)
    .send({ token, username: user.get('username'), name: user.get('name') });
};

export { login };
