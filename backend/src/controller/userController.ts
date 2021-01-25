import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import { generateToken } from '../utils/generateToken';
import User from '../models/User';

// @desc    Register New User and Send the Auth Token
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201);
      res.json({
        _id: user.id,
        username,
        email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid User Data');
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
});

// @desc    Auth and Send Token
// @route   POST /api/users/login
// @access  Public

const login = asyncHandler(async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;
  let user;
  try {
    if (usernameOrEmail.includes('@')) {
      user = await User.findOne({ email: usernameOrEmail });
    } else {
      user = await User.findOne({ username: usernameOrEmail });
    }

    if (!user) {
      res.status(400);
      throw new Error('Invalid Credentials');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      res.status(401);
      throw new Error('Invalid Credentials');
    }

    //User with valid credentials
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
});

export { register, login };
