import axios from "axios";
import {
  HotelDataType,
  HotelSearchResponse,
  PaymentIntentResponse,
  UserType,
} from "./../../backend/src/shared/types";
import { RegisterFormData, SignInFormData } from "./types/authTypes";
import { BookingFormData } from "./types/bookingFormDataTypes";
import { SearchParams } from "./types/searchContextTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
axios.defaults.withCredentials = true;

export const getCurrentUser = async (): Promise<UserType> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`);
    const data = response.data.user;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/register`,
      formData,
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/validate-token`);
    const data = response.data.user;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const signIn = async (formData: SignInFormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logOut = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/log-out`);
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/my-hotels`,
      hotelFormData,
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getMyHotels = async (): Promise<HotelDataType[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-hotels`);
    const data = response.data.hotels;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getMyHotelDetails = async (
  hotelId: string,
): Promise<HotelDataType> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-hotels/${hotelId}`);
    const data = response.data.hotel;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateMyHotel = async (hotelFormData: FormData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/my-hotels/${hotelFormData.get("hotelId")}`,
      hotelFormData,
    );
    const data = response.data.hotel;
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteMyHotelImage = async (url: string, hotelId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/my-hotels/${hotelId}`, {
      url,
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getSearchHotels = async (
  searchParams: SearchParams,
): Promise<HotelSearchResponse> => {
  try {
    const paramsObj = {
      destination: searchParams.destination || "",
      checkIn: searchParams.checkIn || "",
      checkOut: searchParams.checkOut || "",
      adultCount: searchParams.adultCount || "",
      childCount: searchParams.childCount || "",
      page: searchParams.page || "",
      maxPrice: searchParams.maxPrice || "",
      sortOption: searchParams.sortOption || "",
    };
    const queryParams = new URLSearchParams(paramsObj); // output "destination=Paris&page=1"

    searchParams.facilities?.forEach((facility) =>
      queryParams.append("facilities", facility),
    );
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await axios.get(
      `${API_BASE_URL}/hotels/search?${queryParams}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getHotelDetails = async (
  hotelId: string,
): Promise<HotelDataType> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}`);
    const data = response.data.hotel;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string,
): Promise<PaymentIntentResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/hotels/${hotelId}/bookings/payment-intent`,
      { numberOfNights },
    );
    const data = response.data.response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const createRoomBooking = async (formData: BookingFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/hotels/${formData.hotelId}/bookings`,
      { formData },
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const myHotelBookings = async (): Promise<HotelDataType[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/my-booking`);
    const data = response.data.myBookings;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
