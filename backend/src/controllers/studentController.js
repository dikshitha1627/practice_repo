import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import Class from '../models/Class.js';

export const getStudents = async (req, res) => {
  try {
    const students = await User.find(
      { role: 'STUDENT' },
      'username role'
    );

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = ['Math', 'English'];

    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.find({
      student: id
    }).sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getStudentClasses = async (req, res) => {
  try {
    const { id } = req.params;

    const classes = await Class.find({
      students: id
    })
      .populate('tutor', 'username')
      .sort({ date: 1 });

    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};