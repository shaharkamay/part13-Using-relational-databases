import express from 'express';
import 'express-async-errors';
import { login } from '../controllers/login';

const router = express.Router();

router.post('/', login);

export default router;
