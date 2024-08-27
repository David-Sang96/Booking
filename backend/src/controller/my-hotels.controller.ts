import { Request, Response } from 'express';

import Hotel from '../models/hotel.model';
import { HotelDataType } from '../shared/types';
import cloudinary from '../ultis/cloudinary';

export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelDataType = req.body;

    const uploadPromises = imageFiles.map(async (image) => {
      // convert image to base64 string to be able to process by cloudinary
      const b64 = Buffer.from(image.buffer).toString('base64');
      const dataURI = 'data:' + image.mimetype + ';base64,' + b64;
      const response = await cloudinary.uploader.upload(dataURI);
      return response.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
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

export const getHotel = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json({ success: true, hotels });
  } catch (error) {
    console.log('Error in getHotel Controller: ', error);
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};
