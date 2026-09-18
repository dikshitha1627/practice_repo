import express from 'express';

import {
  getPrograms,
  joinProgram,
  getMyPrograms
} from '../controllers/programController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPrograms);

router.post('/join', protect, joinProgram);

router.get('/my-programs/:id', protect, getMyPrograms);

export default router;