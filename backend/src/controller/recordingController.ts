import expressAsyncHandler from 'express-async-handler';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { uploadDir } from '../index';
import User from '../models/User';
import Recording from '../models/Recording';
import { json } from 'express';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req: any, file, cb) {
    cb(
      null,
      `${req.user.username}-${Date.now()}-${path.extname(file.originalname)}`
    );
  },
});

var limits = { fileSize: 1024 * 1024 * 50 }; //Sets the limit that file can only bt up to 50mb

export const upload = multer({
  limits,
  storage,
});

const gc = new Storage({
  keyFilename: path.join(__dirname, '../recording.json'),
  projectId: 'justforbucketrecording',
});

////////////////////////Route Handlers////////////////////////////////////////////////////////////

// @desc    Upload recording
// @route   POST /api/recordings/upload
// @access  Only Authenticated users
export const uploadRecording = expressAsyncHandler(async (req: any, res) => {
  const user: any = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  let { title, description, isPublic, tags } = req.body;
  isPublic = Boolean(isPublic);

  const bucket = gc.bucket('justforbucketrecording.appspot.com');

  const uploadRes = await bucket.upload(`${req.file.path}`, {
    public: isPublic,
  });

  const fileUri = `https://storage.googleapis.com/${bucket.name}/${req.file.filename}`;

  const recording = await Recording.create({
    user,
    fileUri,
    title,
    tags,
    description,
    isPublic,
  });

  if (uploadRes) {
    //Deleting the file from file system
    fs.unlink(path.join(uploadDir, req.file.filename), () => {
      console.log('file deleted'.underline.red);
    });
  }

  res.json(recording);
});

// @desc    Get recording uri
// @route   GET /api/recordings/username
// @access  Only Authenticated users
export const getRecordingsByUsername = expressAsyncHandler(async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    const recordings = await Recording.find({ user, isPublic: true });

    res.json(recordings);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Get recording uri
// @route   GET /api/recordings/my
// @access  Only the user specific
export const getMyRecordings = expressAsyncHandler(async (req: any, res) => {
  try {
    const user = req.user;

    console.log(user);

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    const recordings = await Recording.find({ user });

    res.json(recordings);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Edit the title,tags,description,isPublic of a recording
// @route   GET /api/recordings/edit
// @access  Only the user creator of the recording
export const editRecording = expressAsyncHandler(async (req: any, res) => {
  const { recordingId, title, tags, description, isPublic } = req.body;
  const user = req.user;

  const recording: any = await Recording.findById(recordingId);

  if (!recording) {
    res.status(400);
    throw new Error('Recording not found');
  }

  const isUsersRecording = String(recording?.user) === String(user._id);

  if (!isUsersRecording) {
    res.status(401);
    throw new Error('Unauthorized ');
  }

  recording.title = title || recording.title;
  recording.tags = tags || recording.tags;
  recording.description = description || recording.description;
  recording.isPublic = isPublic || recording.isPublic;

  const updatedRecording = await recording.save();

  res.json(updatedRecording);
});

// @desc    Delete the recording
// @route   DELETE /api/recordings/delete
// @access  Only the user creator of the recording
export const deleteRecording = expressAsyncHandler(async (req: any, res) => {
  const { recordingid } = req.headers;
  const user = req.user;

  const recording: any = await Recording.findById(recordingid);

  if (!recording) {
    res.status(400);
    throw new Error('Recording not found');
  }

  const isUsersRecording = String(recording?.user) === String(user._id);

  if (!isUsersRecording) {
    res.status(401);
    throw new Error('Unauthorized ');
  }

  const isDeleted = await recording?.deleteOne({ _id: recordingid });
  res.json({ status: 'success', deletedRecording: isDeleted.title });
});

// @desc    Like the recording
// @route   PUT /api/recordings/toggle-like/:id
// @access  All authenticated users
export const toggleLikeRecording = expressAsyncHandler(
  async (req: any, res) => {
    const recording: any = await Recording.findById(req.params.id);

    // Check if the recording has already been liked
    if (recording.likes.some((like) => like.user.toString() === req.user.id)) {
      recording.likes = recording.likes.filter(
        (myLike) => myLike.user.toString() !== req.user.id
      );
      await recording.save();
      return res.json(recording.likes);
    }

    recording.likes.unshift({ user: req.user.id });

    await recording.save();

    return res.json(recording.likes);
  }
);

// @desc    Comment on the recording
// @route   PUT /api/recordings/comment/:id
// @access  All authenticated users
export const commentOnRecording = expressAsyncHandler(async (req: any, res) => {
  const user: any = req.user;
  const recording: any = await Recording.findById(req.params.id);
  const { comment } = req.body;

  console.log(recording.comments);

  recording.comments.push({ user, comment });

  await recording.save();

  return res.json(recording.comments);
});

// @desc    Get all the comments of a recording
// @route   GET /api/recordings/comment/:id
// @access  All authenticated users
export const getComments = expressAsyncHandler(async (req, res) => {
  const recording: any = await Recording.findById(req.params.id);

  if (!recording) {
    res.status(404);
    throw new Error('Recording not found');
  }

  res.json(recording.comments);
});
