import express from 'express';
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
import {
  upload,
  uploadProfilePictureHandler,
} from '../controller/userProfilePictureController';
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

router.post(
  '/upload-profilePicture',
  protect,
  upload.single('image'),
  uploadProfilePictureHandler
);

router.route('/').post(register);

export default router;
