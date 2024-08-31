import express from 'express';
import { searchHotels } from '../controller/hotels.controller';
const router = express.Router();

router.get('/search', searchHotels);

export default router;
