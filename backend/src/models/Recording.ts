import mongoose, { Mongoose } from 'mongoose';

const comment = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const like = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const recordingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fileUri: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    likes: [like],
    comments: [comment],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Recording', recordingSchema);
