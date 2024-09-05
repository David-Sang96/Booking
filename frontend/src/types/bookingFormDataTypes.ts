import {
  PaymentIntentResponse,
  UserType,
} from "../../../backend/src/shared/types";

export type BookingFormProps = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  hotelId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  paymentIntentId: string;
  totalCost: number;
};
