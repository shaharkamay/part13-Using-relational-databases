import express from 'express';
import blogRouter from './blog';
import userRouter from './user';
import authorRouter from './author';
import adminRouter from './admin';
import readingListRouter from './reading-list';
import { login, logout } from '../controllers/user';
import { isSessionActive } from '../utils/middleware/user';
import 'express-async-errors';

const router = express.Router();

router.post('/login', login);

router.use(isSessionActive);

router.delete('/logout', logout);

router.use('/blogs', blogRouter);
router.use('/users', userRouter);
router.use('/authors', authorRouter);
router.use('/admin', adminRouter);
router.use('/reading-list', readingListRouter);

export default router;
