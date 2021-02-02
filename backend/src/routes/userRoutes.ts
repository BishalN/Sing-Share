import express from 'express';
import {
  register,
  login,
  resetPassword,
  changePassword,
  facebookLogin,
  googleLogin,
} from '../controller/userController';
import {
  getUser,
  getUsers,
  getUserByUsername,
  updateProfile,
  profilePictureUpload,
} from '../controller/userProfileController';
import multer from 'multer';

import admin, { storage } from 'firebase-admin';

import { protect } from '../middleware/authMiddleware';

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
router.route('/').post(register);

export default router;
