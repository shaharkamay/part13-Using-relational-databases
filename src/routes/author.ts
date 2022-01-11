import express from 'express';
import { getAllAuthors } from '../controllers/author';

const router = express.Router();

router.get('/', getAllAuthors);

export default router;
