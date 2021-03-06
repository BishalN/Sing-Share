import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { uploadDir } from '../index';
import User from '../models/User';

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

var limits = { fileSize: 1024 * 1024 * 5 }; //Sets the limit that file can only bt up to 5mb

const upload = multer({
  limits,
  storage,
});

const gc = new Storage({
  keyFilename: path.join(__dirname, '../google.json'),
  projectId: 'recordandshare-4e3f0',
});

// @desc    Update the user profile
// @route   POST /api/users/upload-profilePicture
// @access  Private only the account holder user
const uploadProfilePictureHandler = async (req: any, res) => {
  try {
    const user: any = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    const bucket = gc.bucket('recordandshare-4e3f0.appspot.com');
    const uploadRes = await bucket.upload(`${req.file.path}`, {});
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${req.file.filename}`;

    if (uploadRes) {
      //Deleting the file from file system
      fs.unlink(path.join(uploadDir, req.file.filename), () => {
        console.log('file deleted');
      });
    }

    user.profilePicture = publicUrl;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500);
    console.log(error.message);
    throw new Error(error.message);
  }
};

export { upload, uploadProfilePictureHandler };
