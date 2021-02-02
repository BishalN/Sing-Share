import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';
import formData from 'form-data';
import { Storage } from '@google-cloud/storage';
import path from 'path';

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

// @desc    Update the user profile
// @route   PUT /api/users/update-profile
// @access  Private only the account holder user

const updateProfile = asyncHandler(async (req: any, res) => {
  //Since the user is logged in
  const user: any = await User.findById(req.user._id);

  const { username, fullName, bio, email } = req.body;

  if (user) {
    user.username = username || user.username;
    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.email = email || user.email;
    user.profilePicture = user.profilePicture;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      bio: updatedUser.bio,
      fullName: updatedUser.fullName,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const profilePictureUpload = asyncHandler(async (req, res) => {
  const gc = new Storage({
    keyFilename: path.join(__dirname, '../google.json'),
    projectId: 'recordandshare-4e3f0',
  });

  const myBucket = gc.bucket('recordandshare-4e3f0.appspot.com');

  myBucket.file('myfile').createWriteStream({ resumable: false });
});

export {
  getUsers,
  getUser,
  getUserByUsername,
  updateProfile,
  profilePictureUpload,
};
