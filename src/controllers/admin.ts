import { Request, Response } from 'express';
import { sessionService, userService } from '../services';

const changeUserStatus = async (req: Request, res: Response) => {
  if (!req.isAdmin)
    throw { status: 403, message: 'Only admin can change user status' };

  const { username } = req.params;
  const { disabled } = req.body;
  if (!username || disabled == undefined)
    throw { status: 400, message: 'Bad request' };

  const user = await userService.changeUserStatus(username, disabled);
  if (user) {
    res.json(user);
    if (disabled === true)
      await sessionService.deleteSession(user.get('id') as number);
  } else throw { status: 404, message: 'User not found' };
};

export { changeUserStatus };
