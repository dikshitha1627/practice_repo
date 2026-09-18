import express from 'express';

import { getTutorClasses } from '../controllers/tutorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/tutor/:id', protect, getTutorClasses);

export default router;