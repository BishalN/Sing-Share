import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';

const client = new OAuth2Client(
  '1094965231233-8smhp95p11cj6lehlhvshqjf4b9nrao8.apps.googleusercontent.com'
);

import { generateToken } from '../utils/generateToken';
import User from '../models/User';
import { sendForgetPasswordEmail } from '../utils/sendForgetPasswordEmail';

// @desc    Register New User and Send the Auth Token
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, fullName } = req.body;

  if (username.includes(' ' || '@')) {
    res.status(400);
    throw new Error('Space and @ character are not allowed in Username');
  }
  const duplicateUsername = await User.findOne({ username });
  if (duplicateUsername) {
    res.status(401);
    throw new Error('Username already in use');
  }

  const duplicateEmail = await User.findOne({ email });
  if (duplicateEmail) {
    res.status(401);
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201);
      res.json({
        _id: user.id,
        fullName,
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
      fullName: user.fullName,
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
  const { newPassword, token } = req.body;
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
      fullName: user.fullName,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
});

// @desc    Login with google
// @route   POST /api/users/google-login
// @access  public
const googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  const { payload } = (await client.verifyIdToken({
    idToken,
    audience:
      '1094965231233-8smhp95p11cj6lehlhvshqjf4b9nrao8.apps.googleusercontent.com',
  })) as any;

  const { email, email_verified, picture, name } = payload;

  if (email_verified) {
    try {
      const user: any = await User.findOne({ email });

      //User already exists
      if (user) {
        res.json({
          _id: user.id,
          profilePicture: picture,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          token: generateToken(user.id),
        });
      } else {
        //Brand new User
        let password = email + process.env.JWT_SECRET;
        let username = name;
        try {
          const user = await User.create({
            fullName: name,
            username,
            email,
            password,
            profilePicture: picture,
          });

          if (user) {
            res.status(201);
            res.json({
              _id: user.id,
              username,
              fullName: name,
              email,
              profilePicture: picture,
              token: generateToken(user.id),
            });
          }
        } catch (error) {
          res.status(500);
          throw new Error(error.message);
        }
      }
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  }
});

// @desc    Login with facebook
// @route   POST /api/users/facebook-login
// @access  public
const facebookLogin = asyncHandler(async (req, res) => {
  const { accessToken, userId } = req.body;
  let userData;
  let graphUrl = `https://graph.facebook.com/v9.0/${userId}/?fields=id,name,email,picture&access_token=${accessToken}`;
  await fetch(graphUrl, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => (userData = data));
  const {
    name,
    email,
    picture: {
      data: { url },
    },
  } = userData;

  if (!email) {
    res.status(403);
    throw new Error(
      'You cannot continue with your facebook as no email address is associated with your facebook account'
    );
  }

  try {
    const user: any = await User.findOne({ email });

    //User already exists
    if (user) {
      res.json({
        _id: user.id,
        profilePicture: url,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      //Brand new User
      let password = email + process.env.JWT_SECRET;
      let username = name;
      try {
        const user = await User.create({
          fullName: name,
          username,
          email,
          password,
          profilePicture: url,
        });

        if (user) {
          res.status(201);
          res.json({
            _id: user.id,
            fullName: name,
            username,
            email,
            profilePicture: url,
            token: generateToken(user.id),
          });
        }
      } catch (error) {
        res.status(500);
        throw new Error(error.message);
      }
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export {
  register,
  login,
  resetPassword,
  changePassword,
  facebookLogin,
  googleLogin,
};
