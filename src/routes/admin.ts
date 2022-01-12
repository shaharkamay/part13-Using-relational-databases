import express from 'express';
import 'express-async-errors';
import { changeUserStatus } from '../controllers/admin';
import { tokenExtractor } from '../utils/middleware/jwt';
import { isAdmin } from '../utils/middleware/user';

const router = express.Router();

router.put('/:username', tokenExtractor, isAdmin, changeUserStatus);

export default router;
