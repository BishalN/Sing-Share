import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { generateToken } from '../utils/generateToken';
import User from '../models/User';
import { sendForgetPasswordEmail } from '../utils/sendForgetPasswordEmail';

// @desc    Register New User and Send the Auth Token
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userAlreadyExistsWithThatUsername = await User.findOne({ username });
  if (userAlreadyExistsWithThatUsername) {
    res.status(401);
    throw new Error('Username already in use');
  }

  const userAlreadyExistsWithThatEmail = await User.findOne({ email });
  if (userAlreadyExistsWithThatEmail) {
    res.status(401);
    throw new Error('Email already in use');
  }

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

// @desc    Reset Password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error('User with that email does not exist');
    }

    const userid = user.id;
    const token = jwt.sign({ userid }, process.env.JWT_SECRET!, {
      expiresIn: '30m',
    });

    sendForgetPasswordEmail(user.email, token);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
  res.json({
    message:
      'The reset email has been sent to the owner of the email plz check out your mail inbox',
  });
});

// @desc    Reset Password
// @route   POST /api/users/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const { userid }: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user: any = await User.findById(userid);

    if (!user) {
      res.status(404);
      throw new Error('Invalid Request');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.save();

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
});

export { register, login, resetPassword, changePassword };
