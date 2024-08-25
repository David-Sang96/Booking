import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import { createHotel } from '../controller/my-hotels.controller';
import uploadFiles from '../ultis/uploadFiles';
import { validationResults } from '../ultis/validationResults';

const hotelValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('type').trim().notEmpty().withMessage('Hotel type is required'),
  body('pricePerNight')
    .notEmpty()
    .isNumeric()
    .withMessage('Price per night  is required and must be a number'),
  body('facilities')
    .notEmpty()
    .isArray()
    .withMessage('Facilities are required'),
  validationResults,
];

const router = express.Router();

router.post(
  '/',
  hotelValidation,
  (req: Request, res: Response, next: NextFunction) => {
    uploadFiles(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: err.message });
      } else if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  hotelValidation,
  createHotel
);

export default router;
