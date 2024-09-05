import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import * as apiClient from "../../api-client";
import { useSearchContext } from "../../contexts/SearchContext";
import {
  BookingFormData,
  BookingFormProps,
} from "../../types/bookingFormDataTypes";

const BookingForm = ({ currentUser, paymentIntent }: BookingFormProps) => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      paymentIntentId: paymentIntent.paymentIntentId,
      hotelId,
      totalCost: paymentIntent.totalCost,
    },
  });

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: (data) => {
        toast.success(data.message);
        search.saveSearchValues("", new Date(), new Date(), 1, 0);
        navigate("/search");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  );

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      className="space-y-5 rounded-lg border border-slate-300 p-5 shadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-2xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-sm font-bold text-gray-700">
          First Name
          <input
            type="text"
            readOnly
            disabled
            {...register("firstName")}
            className="mt-1 w-full rounded bg-gray-200 p-2 font-normal text-gray-700 focus:outline-none"
          />
        </label>
        <label className="text-sm font-bold text-gray-700">
          Last Name
          <input
            type="text"
            readOnly
            disabled
            {...register("lastName")}
            className="mt-1 w-full rounded bg-gray-200 p-2 font-normal text-gray-700 focus:outline-none"
          />
        </label>
      </div>
      <label className="block text-sm font-bold text-gray-700">
        Email
        <input
          type="text"
          readOnly
          disabled
          {...register("email")}
          className="mt-1 w-full rounded bg-gray-200 p-2 font-normal text-gray-700 focus:outline-none"
        />
      </label>
      <div>
        <div className="pb-2 text-xl font-semibold">Your Price Summary</div>
        <div className="rounded bg-blue-300 p-4">
          <div className="font-bold">
            Total cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>
      <div className="">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="rounded-md border p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center gap-1 rounded border border-blue-800 bg-slate-50 px-3 py-2 text-sm duration-300 hover:bg-blue-800 hover:text-white md:text-base ${isLoading && "cursor-not-allowed"}`}
        >
          {isLoading && <PiSpinnerBold className="size-6 animate-spin" />}
          <p>Confirm Booking</p>
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
