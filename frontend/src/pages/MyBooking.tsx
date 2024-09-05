import { useQuery } from "react-query";

import toast from "react-hot-toast";
import * as apiClient from "../api-client";

const MyBooking = () => {
  const { data: hotels } = useQuery(
    "getMyBookings",
    apiClient.myHotelBookings,
    {
      onError: (error: Error) => toast.error(error.message),
    },
  );

  if (!hotels || hotels.length === 0) return <span>No bookings found</span>;

  return (
    <div>
      <h1 className="pb-5 text-3xl font-bold">My Bookings</h1>
      <div className="space-y-3">
        {hotels.map((hotel) => (
          <div
            className="grid gap-3 rounded-md border border-slate-300 p-3 shadow lg:grid-cols-[2fr_3fr]"
            key={hotel._id}
          >
            <div className="lg:h-[300px]">
              <img
                src={hotel.imageUrls[0]}
                alt="hotel image"
                className="h-full w-full rounded-md object-cover object-center"
              />
            </div>
            <div className="max-h-[300px] space-y-5 overflow-y-auto lg:ps-10">
              <div>
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <p className="text-xs font-normal">
                  {hotel.city}, {hotel.country}
                </p>
              </div>

              <div>
                {hotel.bookings.map((booking, i) => (
                  <div key={i} className="pb-3">
                    <div>
                      <span className="font-bold">Dates: </span>{" "}
                      {new Date(booking.checkIn).toDateString()} -{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </div>
                    <div>
                      <span className="font-bold">Guests: </span>{" "}
                      {booking.adultCount} Adults, {booking.childCount} Children
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
