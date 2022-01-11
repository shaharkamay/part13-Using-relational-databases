import express from 'express';
import {
  addUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUsername,
} from '../controllers/user';
import { userFinder } from '../utils/middleware/user';
import 'express-async-errors';
import { tokenExtractor } from '../utils/middleware/jwt';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addUser);
router.get('/:id', userFinder, getUserById);
router.delete('/:id', userFinder, deleteUser);
router.put('/:username', tokenExtractor, updateUsername);

export default router;
