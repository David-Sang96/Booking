import { Request, Response } from 'express';
import User from '../models/user.model';
import { createJWTTokenAndSetCookie } from '../ultis/createJWTTokenAndSetCookie';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    createJWTTokenAndSetCookie(res, user._id);
    user.password = undefined;

    res
      .status(201)
      .json({ success: true, message: 'Registered successfully', user });
  } catch (error) {
    console.error('Error in register controller: ', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-__v');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error in user controller: ', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
