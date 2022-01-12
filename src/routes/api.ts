import express from 'express';
import blogRouter from './blog';
import userRouter from './user';
import loginRouter from './login';
import authorRouter from './author';
import adminRouter from './admin';
import readingListRouter from './reading-list';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/authors', authorRouter);
router.use('/admin', adminRouter);
router.use('/reading-list', readingListRouter);

export default router;
