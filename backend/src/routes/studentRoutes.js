import express from 'express';
import { getStudents, getSubjects } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getStudents);
router.get('/subjects', protect, getSubjects);

export default router;