import express from 'express';
import blogRouter from './blog';
import userRouter from './user';
import loginRouter from './login';
import authorRouter from './author';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);
router.use('/authors', authorRouter);

export default router;
