import expressAsyncHandler from 'express-async-handler';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { uploadDir } from '../index';
import User from '../models/User';
import Recording from '../models/Recording';

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

export const uploadRecording = expressAsyncHandler(async (req: any, res) => {
  const user: any = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  let { title, description, isPublic, tags } = req.body;
  isPublic = Boolean(isPublic);

  const bucket = gc.bucket('justforbucketrecording.appspot.com');

  const uploadRes = await bucket.upload(`${req.file.path}`, {});
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
