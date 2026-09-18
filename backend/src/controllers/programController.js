import Program from '../models/Program.js';

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();

    res.status(200).json(programs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const joinProgram = async (req, res) => {
  try {
    const { programId } = req.body;

    if (!programId) {
      return res.status(400).json({
        message: 'Program ID is required'
      });
    }

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({
        message: 'Program not found'
      });
    }

    if (program.participants.includes(req.user.userId)) {
      return res.status(400).json({
        message: 'Already joined this program'
      });
    }

    program.participants.push(req.user.userId);

    await program.save();

    res.status(200).json({
      message: 'Program joined successfully',
      program
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getMyPrograms = async (req, res) => {
  try {
    const { id } = req.params;

    const programs = await Program.find({
      participants: id
    });

    res.status(200).json(programs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};