import User from '../models/User.js';
import Class from '../models/Class.js';

export const getTutorStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const classes = await Class.find({
      tutor: id
    }).populate('students', 'username role');

    const studentsMap = new Map();

    classes.forEach((classItem) => {
      classItem.students.forEach((student) => {
        studentsMap.set(student._id.toString(), student);
      });
    });

    res.status(200).json([...studentsMap.values()]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getTutorClasses = async (req, res) => {
  try {
    const { id } = req.params;

    const classes = await Class.find({
      tutor: id
    })
      .populate('students', 'username role')
      .populate('tutor', 'username');

    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};