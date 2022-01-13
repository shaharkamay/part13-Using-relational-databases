import { Session } from '../models';
import { NewSession } from '../@types/session';

const getSessionByUserId = async (userId: number) => {
  const session = await Session.findOne({ where: { userId } });
  return session;
};

const addSession = async ({ token, userId }: NewSession) => {
  const isExists = await isSessionExists(userId);
  if (isExists) {
    const session = await updateToken(token, userId);
    return session;
  }
  const newSession = await Session.create({ token, userId });
  return newSession;
};

const isSessionExists = async (userId: number) => {
  const isExist = await Session.findOne({ where: { userId } });
  if (isExist != null) return true;
  return false;
};

const updateToken = async (token: string, userId: number) => {
  const session = await getSessionByUserId(userId);
  if (session == null)
    throw { status: 500, message: 'Error in updating token' };
  session.set('token', token);
  await session.save();
  return session;
};

const deleteSession = async (userId: number) => {
  const session = await getSessionByUserId(userId);
  if (session == null)
    throw { status: 500, message: 'Error in updating token' };

  await session.destroy();
  return true;
};

export default {
  addSession,
  isSessionExists,
  getSessionByUserId,
  updateToken,
  deleteSession,
};
