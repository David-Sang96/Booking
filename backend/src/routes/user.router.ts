import express from 'express';
import { body } from 'express-validator';

import { getMe, register } from '../controller/user.controller';
import verifyToken from '../middleware/auth';
import User from '../models/user.model';
import { validationResults } from '../ultis/validationResults';
const router = express.Router();

const registerValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  validationResults,
];

router.post('/register', registerValidation, register);

router.get('/me', verifyToken, getMe);

export default router;
