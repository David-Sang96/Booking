import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { CardElement } from "@stripe/react-stripe-js";
import * as apiClient from "../../api-client";
import {
  BookingFormData,
  BookingFormProps,
} from "../../types/bookingFormDataTypes";

const BookingForm = ({ currentUser, paymentIntent }: BookingFormProps) => {
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  const { mutate } = useMutation(apiClient.getSearchHotels);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      className="space-y-5 rounded-lg border border-slate-300 p-5 shadow"
      onSubmit={onSubmit}
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
    </form>
  );
};

export default BookingForm;
