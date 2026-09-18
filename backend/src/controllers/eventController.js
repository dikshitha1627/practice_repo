import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({
        message: 'Title, description and date are required'
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      createdBy: req.user.userId
    });

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'username role')
      .sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};