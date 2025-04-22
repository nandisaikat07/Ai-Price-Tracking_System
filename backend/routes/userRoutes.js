import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import { isAuth, isAdmin, generateToken, baseUrl } from '../utils.js';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

const userRouter = express.Router();

dotenv.config();

// Rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later.'
});

// Email transporter configuration
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ST_EMAIL_ID,
    pass: process.env.ST_PASS,
  },
});

// Generate email verification token
const generateEmailVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Send verification email
const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${baseUrl()}/verify-email/${token}`;
  
  const mailOptions = {
    from: process.env.ST_EMAIL_ID,
    to: user.email,
    subject: 'Verify your email address',
    html: `
      <h2>Welcome to AI-Price-Tracking!</h2>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.post(
  '/forget-password',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
      });
      user.resetToken = token;
      await user.save();

      //reset link
      console.log(`${baseUrl()}/reset-password/${token}`);

      // mailgun()
      //   .messages()
      //   .send(
      //     {
      //       from: 'Amazona <me@mg.yourdomain.com>',
      //       to: `${user.name} <${user.email}>`,
      //       subject: `Reset Password`,
      //       html: `
      //        <p>Please Click the following link to reset your password:</p>
      //        <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
      //        `,
      //     },
      //     (error, body) => {
      //       console.log(error);
      //       console.log(body);
      //     }
      //   );

      var mailOptions = {
        from: 'Stdio Nupur <buystudionupur@gmail.com>',
        to: `${user.name} <${user.email}>`,
        subject: `Reset Password`,
        html: ` 
             <p>Please Click the following link to reset your password:</p> 
             <a href="${baseUrl()}/reset-password/${token}"}>Reset Password</a>
             `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send({ message: 'We sent reset password link to your email.' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.post(
  '/reset-password',
  expressAsyncHandler(async (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        const user = await User.findOne({ resetToken: req.body.token });
        if (user) {
          if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
            await user.save();
            res.send({
              message: 'Password reseted successfully',
            });
          }
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      await user.deleteOne();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const verificationToken = generateEmailVerificationToken();
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      emailVerificationToken: verificationToken
    });

    const user = await newUser.save();
    await sendVerificationEmail(user, verificationToken);

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmailVerified: user.isEmailVerified,
      token: generateToken(user),
      message: 'Please check your email to verify your account.'
    });
  })
);

userRouter.post(
  '/signin',
  authLimiter,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (user) {
      // Check if account is locked
      if (user.lockUntil && user.lockUntil > Date.now()) {
        const timeLeft = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
        return res.status(401).send({ 
          message: `Account is locked. Try again in ${timeLeft} minutes.` 
        });
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        // Reset login attempts on successful login
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.lastLogin = new Date();
        await user.save();

        if (!user.isEmailVerified) {
          return res.status(401).send({ 
            message: 'Please verify your email address first.',
            isEmailVerified: false
          });
        }

        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isEmailVerified: user.isEmailVerified,
          token: generateToken(user),
        });
      } else {
        // Increment failed login attempts
        user.loginAttempts += 1;
        
        // Lock account after 5 failed attempts
        if (user.loginAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        }
        
        await user.save();
        res.status(401).send({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  })
);

// Email verification route
userRouter.get(
  '/verify-email/:token',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ 
      emailVerificationToken: req.params.token 
    });

    if (!user) {
      return res.status(400).send({ message: 'Invalid or expired verification token' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.send({ message: 'Email verified successfully' });
  })
);

// Resend verification email
userRouter.post(
  '/resend-verification',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).send({ message: 'Email already verified' });
    }

    const verificationToken = generateEmailVerificationToken();
    user.emailVerificationToken = verificationToken;
    await user.save();
    
    await sendVerificationEmail(user, verificationToken);
    
    res.send({ message: 'Verification email sent' });
  })
);

export default userRouter;
