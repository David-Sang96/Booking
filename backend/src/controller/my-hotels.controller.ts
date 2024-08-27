import { Request, Response } from 'express';
import { saveToCloudinary } from './../ultis/saveToCloudinary';

import Hotel from '../models/hotel.model';
import { HotelDataType } from '../shared/types';
import cloudinary from '../ultis/cloudinary';

export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelDataType = req.body;

    const imageUrls = await saveToCloudinary(imageFiles);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = await Hotel.create(newHotel);

    res
      .status(201)
      .json({ success: true, message: 'Hotel created successfully', hotel });
  } catch (error) {
    console.log('Error in createHotel Controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json({ success: true, hotels });
  } catch (error) {
    console.log('Error in getHotel Controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const getHotelDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    if (!hotel) {
      return res.status(400).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    res.json({ success: true, hotel });
  } catch (error) {
    console.log('Error in getHotelDetails Controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const updateHotelDetails = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const updatedHotel: HotelDataType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(400).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    const imageFiles = req.files as Express.Multer.File[];
    const updatedImageUrls = await saveToCloudinary(imageFiles);
    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();
    res
      .status(201)
      .json({ success: true, message: 'Updated hotel successfully', hotel });
  } catch (error) {
    console.log('Error in updateHotelDetails Controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};

export const deleteHotelImage = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const { hotelId } = req.params;
    const publicId = url.substring(
      url.lastIndexOf('/') + 1,
      url.lastIndexOf('.')
    );
    await cloudinary.uploader.destroy(publicId);
    const hotel = await Hotel.findOne({ _id: hotelId, userId: req.userId });
    if (!hotel) {
      return res.status(400).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    const filterImageUrl = hotel.imageUrls.filter((imgUrl) => imgUrl !== url);
    hotel.imageUrls = filterImageUrl;
    await hotel.save();

    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error(error);
    throw new Error('Cloud delete failed.');
  }
};
