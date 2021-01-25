import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { generateToken } from '../utils/generateToken';
import User from '../models/User';

// @desc    Register New User and Send the Auth Token
// @route   POST /api/users
// @access  Public

const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
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

export { register };
