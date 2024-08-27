import toast from "react-hot-toast";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { BsBuilding, BsMap } from "react-icons/bs";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import * as apiClient from "../api-client";

const MyHotels = () => {
  const { data: hotelData } = useQuery("getMyHotels", apiClient.getMyHotels, {
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (!hotelData) return <span>No Hotels found</span>;

  const items =
    "flex items-center gap-1.5 rounded-sm border border-slate-300 p-3";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Hotels</h2>
        <Link
          to={"/add-hotel"}
          className="rounded bg-blue-700 p-2 text-white duration-300 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </div>
      <div className="grid gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between gap-5 rounded-lg border border-slate-300 p-5 shadow"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className={items}>
                <BsMap />
                {hotel.city},{hotel.country}
              </div>
              <div className={items}>
                <BsBuilding />
                {hotel.type}
              </div>
              <div className={items}>
                <BiMoney />${hotel.pricePerNight} per night
              </div>
              <div className={items}>
                <BiHotel />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className={items}>
                <BiStar />
                {hotel.starRating} stars rating
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {hotel.imageUrls.map((url) => (
                  <div key={url} className="bg-white p-2 shadow">
                    <img
                      src={url}
                      alt="hotel image"
                      className="h-24 w-24 rounded-md object-cover"
                    />
                  </div>
                ))}
              </div>

              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="underline duration-300 hover:text-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
