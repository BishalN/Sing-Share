import mongoose, { Mongoose } from 'mongoose';

const comment = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
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
    tags: {
      type: String,
    },
    description: {
      type: String,
    },
    likes: [like],
    comments: [comment],
    isPublic: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Recording', recordingSchema);
