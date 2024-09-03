import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useAppContext } from "../contexts/AppContext";
import { useSearchContext } from "../contexts/SearchContext";
import BookingForm from "../forms/BookingForm/BookingForm";

const Booking = () => {
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const { hotelId } = useParams();
  const { adultCount, checkIn, childCount, checkOut } = useSearchContext();
  const { stripePromise } = useAppContext();

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights =
        Math.abs(checkOut.getTime() - checkIn.getTime()) /
        (24 * 60 * 60 * 1000);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkIn, checkOut]);

  const { data: hotel } = useQuery(
    "getHotelDetails",
    () => apiClient.getHotelDetails(hotelId as string),
    { enabled: !!hotelId },
  );

  const { data: currentUser } = useQuery(
    "getCurrentUser",
    apiClient.getCurrentUser,
  );

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString(),
      ),
    { enabled: !!hotelId && numberOfNights > 0 },
  );
  console.log(paymentIntentData);

  if (!hotel) return <></>;

  return (
    <div className="mt-5 grid gap-5 md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={checkIn}
        checkOut={checkOut}
        numberOfNights={numberOfNights}
        hotel={hotel}
        adultCount={adultCount}
        childCount={childCount}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
