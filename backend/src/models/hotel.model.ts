import mongoose from 'mongoose';
import { BookingType, HotelDataType } from '../shared/types';

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

const hotelSchema = new mongoose.Schema<HotelDataType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
    bookings: [bookingSchema],
  },
  { timestamps: true }
);

// The first HotelDataType represents the type of the document being queried
// The second HotelDataType represents the type of the document that will be returned by the query.
hotelSchema.pre(
  /^find/,
  function (this: mongoose.Query<HotelDataType, HotelDataType>, next) {
    this.select('-__v');
    this.sort('-createdAt');
    next();
  }
);

const Hotel = mongoose.model<HotelDataType>('Hotel', hotelSchema);

export default Hotel;
