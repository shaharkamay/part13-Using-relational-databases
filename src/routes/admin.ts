import express from 'express';
import 'express-async-errors';
import { changeUserStatus } from '../controllers/admin';
import { isAdmin } from '../utils/middleware/user';

const router = express.Router();

router.put('/:username', isAdmin, changeUserStatus);

export default router;
