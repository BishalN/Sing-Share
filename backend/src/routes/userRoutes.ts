import fs from 'fs';
import express from 'express';
import { upload } from '../controller/userProfilePictureController';
import {
  changePassword,
  facebookLogin,
  googleLogin,
  login,
  register,
  resetPassword,
} from '../controller/userController';
import {
  getUser,
  getUserByUsername,
  getUsers,
  updateProfile,
} from '../controller/userProfileController';
import { protect } from '../middleware/authMiddleware';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { profile } from 'console';
import { fstat } from 'fs';
import User from '../models/User';

const storage = new Storage({});
const gc = new Storage({
  keyFilename: path.join(__dirname, '../google.json'),
  projectId: 'recordandshare-4e3f0',
});

const router = express.Router();

router.post('/change-password', changePassword);
router.post('/reset-password', resetPassword);
router.route('/login').post(login);
router.route('/facebook-login').post(facebookLogin);
router.route('/google-login').post(googleLogin);
router.route('/all').get(protect, getUsers);
router.route('/me').get(protect, getUser);
router.route('/:username').get(protect, getUserByUsername);
router.route('/edit').put(protect, updateProfile);

router.post(
  '/upload-profilePicture',
  protect,
  upload.single('image'),
  async (req: any, res) => {
    const user: any = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }
    const bucket = gc.bucket('recordandshare-4e3f0.appspot.com');
    await bucket.upload(`${req.file.path}`, {});
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${req.file.filename}`;

    //Deleting the file from file system
    fs.unlink(path.join(__dirname, req.file.filename), () => {
      console.log('file deleted successfully');
    });

    user.profilePicture = publicUrl;

    const updatedUser = await user.save();

    res.json(updatedUser);

    res.send(`${req.file.path} }`);
  }
);

router.route('/').post(register);

export default router;
