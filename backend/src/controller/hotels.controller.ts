import { Request, Response } from 'express';
import Stripe from 'stripe';
import {
  BookingType,
  HotelDataType,
  HotelSearchResponse,
  PaymentIntentResponse,
} from './../shared/types';

import { ENV_VARS } from '../config/envVars';
import Hotel from '../models/hotel.model';

import { constructSearchQuery } from '../ultis/constructSearchQuery';

const stripe = new Stripe(ENV_VARS.STRIPE_SECRET_KEY as string);

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort('-lastUpdated');
    res.json({ success: true, hotels });
  } catch (error) {
    console.log('Error in getAllHotels controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const searchHotels = async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case 'starRating':
        sortOptions = { starRating: -1 };
        break;
      case 'pricePerNightAsc':
        sortOptions = { pricePerNight: 1 };
        break;
      case 'pricePerNightDesc':
        sortOptions = { pricePerNight: -1 };
    }

    const pageCount = 6;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : '1'
    );
    const skip = (pageNumber - 1) * pageCount;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageCount);
    const totalDocuments = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      success: true,
      hotels,
      pagination: {
        total: totalDocuments,
        page: pageNumber,
        pages: Math.ceil(totalDocuments / pageCount),
      },
    };

    res.json(response);
  } catch (error) {
    console.log('Error in searchHotels controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const hotelDetails = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    res.json({ success: true, hotel });
  } catch (error) {
    console.log('Error in hotelDetails controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { numberOfNights } = req.body;
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: 'Hotel not found' });
    }

    const totalCost = hotel.pricePerNight * numberOfNights;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: 'gbp',
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      return res
        .status(500)
        .json({ success: false, message: 'Error creating payment intent' });
    }

    const response: PaymentIntentResponse = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.json({ success: true, response });
  } catch (error) {
    console.log('Error in hotelPayment controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const confirmBooking = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const { paymentIntentId } = req.body.formData;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );
    if (!paymentIntent) {
      return res
        .status(400)
        .json({ success: false, message: 'payment intent not found' });
    }

    if (
      paymentIntent.metadata.hotelId !== hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'payment intent mismatch' });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking: BookingType = {
      ...req.body.formData,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      { _id: hotelId },
      {
        $push: { bookings: newBooking },
      },
      { new: true }
    );

    if (!hotel) {
      return res
        .status(400)
        .json({ success: false, message: 'Hotel not found' });
    }

    res.json({ success: true, message: 'Booking saved' });
  } catch (error) {
    console.log('Error in confirmBooking controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const getMyBooking = async (req: Request, res: Response) => {
  try {
    //return the entire hotel documents
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const myBookings = hotels.map((hotel) => {
      // filter only the bookings for the logged-in user
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelDataType = {
        ...hotel.toObject(), // convert mongodb object to object literal
        bookings: userBookings, // Keep only the user's bookings
      };

      return hotelWithUserBookings;
    });

    res.json({ success: true, myBookings });
  } catch (error) {
    console.log('Error in getMyBooking controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};
