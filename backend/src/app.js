import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import classRoutes from './routes/classRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
dotenv.config();
import subjectRoutes from './routes/subjectRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import programRoutes from './routes/programRoutes.js';
const app = express();

import tutorClassRoutes from './routes/tutorClassRoutes.js';

app.use(cors());
app.use(express.json());
app.use('/api/subjects', subjectRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/tutor/classes', tutorClassRoutes);
app.use('/api/events', eventRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({
    message: 'Kalam Family backend is running'
  });
});
import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
