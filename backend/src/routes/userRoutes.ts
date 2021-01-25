import express from 'express';
import {
  register,
  login,
  resetPassword,
  changePassword,
} from '../controller/userController';

const router = express.Router();

router.post('/change-password', changePassword);
router.post('/reset-password', resetPassword);
router.route('/login').post(login);
router.route('/').post(register);

export default router;
