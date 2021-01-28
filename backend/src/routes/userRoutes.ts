import express from 'express';
import {
  register,
  login,
  resetPassword,
  changePassword,
  facebookLogin,
  googleLogin,
} from '../controller/userController';

const router = express.Router();

router.post('/change-password', changePassword);
router.post('/reset-password', resetPassword);
router.route('/login').post(login);
router.route('/facebook-login').post(facebookLogin);
router.route('/google-login').post(googleLogin);
router.route('/').post(register);

export default router;
