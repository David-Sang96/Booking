import { HotelDataType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  numberOfNights: number;
  adultCount: number;
  childCount: number;
  hotel: HotelDataType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  childCount,
  adultCount,
  hotel,
  numberOfNights,
}: Props) => {
  return (
    <div className="h-fit rounded-md border border-slate-300 p-5 shadow">
      <h3 className="text-xl font-bold">Your Booking Details</h3>
      <div className="border-b-2 py-3">
        Location:
        <div className="font-bold">
          {hotel.name}, {hotel.city}, {hotel.country}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between border-b-2 py-3">
        <div>
          Check-in:
          <div className="font-bold">{checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out:
          <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-b-2 py-3">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div className="border-b-2 py-3">
        Guests:
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
