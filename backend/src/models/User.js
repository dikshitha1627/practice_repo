import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['STUDENT', 'WOMAN', 'TUTOR', 'VOLUNTEER'],
      required: true,
    },
    subjects: {
  type: [String],
  default: [],
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;