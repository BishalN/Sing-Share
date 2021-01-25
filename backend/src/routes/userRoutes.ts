import express from 'express';
import { register, login } from '../controller/userController';

const router = express.Router();

router.route('/login').post(login);
router.route('/').post(register);

export default router;
