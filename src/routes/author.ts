import express from 'express';
import 'express-async-errors';
import { getAllAuthors } from '../controllers/author';

const router = express.Router();

router.get('/', getAllAuthors);

export default router;
