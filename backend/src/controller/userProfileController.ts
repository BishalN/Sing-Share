import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

// @desc    Get all users from database
// @route   GET /api/users/all
// @access  Authenticated users only

const getUsers = asyncHandler(async (req: any, res: Response) => {
  try {
    const users = await User.find({}).select('-password');

    res.json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Get the user profile of a logged in user
// @route   GET /api/users/me
// @access  Authenticated users only
const getUser = asyncHandler(async (req: any, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Get the specific user profile
// @route   GET /api/users/:username
// @access  Authenticated users only
const getUserByUsername = asyncHandler(async (req: any, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }
    res.json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export { getUsers, getUser, getUserByUsername };
