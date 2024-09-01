import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "getHotelDetails",
    () => apiClient.getHotelDetails(hotelId as string),
    {
      enabled: !!hotelId, // run only when got hotelId
      onError: (error: Error) => toast.error(error.message),
    },
  );

  if (!hotel) return <></>;

  return (
    <div className="space-y-6">
      <div className="">
        <span className="flex items-center">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar key={i} className="fill-blue-500" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {hotel.imageUrls.map((url) => (
          <div className="h-[300px]" key={url}>
            <img
              src={url}
              alt={hotel.name}
              className="h-full w-full rounded-md object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid gap-2 lg:grid-cols-4">
        {hotel.facilities.map((facility) => (
          <div
            className="rounded-sm border border-slate-300 p-3 shadow"
            key={facility}
          >
            {facility}
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
