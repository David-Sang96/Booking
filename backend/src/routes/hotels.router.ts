import express from 'express';
import { param } from 'express-validator';
import { hotelDetails, searchHotels } from '../controller/hotels.controller';
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

export default router;
