import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Class = mongoose.model('Class', classSchema);

export default Class;