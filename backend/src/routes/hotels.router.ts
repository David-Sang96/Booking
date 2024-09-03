import express from 'express';
import { param } from 'express-validator';

import {
  confirmPayment,
  createPayment,
  hotelDetails,
  searchHotels,
} from '../controller/hotels.controller';
import verifyToken from '../middleware/auth';
import { validationResults } from '../ultis/validationResults';

const router = express.Router();

router.get('/search', searchHotels);

router.get(
  '/:hotelId',
  [
    param('hotelId').trim().notEmpty().withMessage('Hotel Id is required'),
    validationResults,
  ],
  hotelDetails
);

router.post('/:hotelId/bookings/payment-intent', verifyToken, createPayment);

router.post('/:hotelId/bookings', verifyToken, confirmPayment);

export default router;
