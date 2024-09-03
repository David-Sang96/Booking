import {
  PaymentIntentResponse,
  UserType,
} from "../../../backend/src/shared/types";

export type BookingFormProps = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};
