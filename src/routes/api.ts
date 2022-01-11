import express from 'express';
import blogRouter from './blog';
import userRouter from './user';
import loginRouter from './login';

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);

export default router;
