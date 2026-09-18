import express from 'express';
import { getStudentClasses } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/student/:id', protect, getStudentClasses);

export default router;