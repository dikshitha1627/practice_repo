import express from 'express';

import { getTutorStudents } from '../controllers/tutorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/students/:id', protect, getTutorStudents);

export default router;