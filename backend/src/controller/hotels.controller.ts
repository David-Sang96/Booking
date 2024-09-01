import { Request, Response } from 'express';
import Hotel from '../models/hotel.model';
import { HotelSearchResponse } from '../shared/types';
import { constructSearchQuery } from '../ultis/constructSearchQuery';

export const searchHotels = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
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
