import express from 'express';
import { getStudentAttendance } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/student/:id', protect, getStudentAttendance);

export default router;