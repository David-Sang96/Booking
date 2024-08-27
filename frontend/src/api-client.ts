import axios from "axios";
import { HotelDataType } from "./../../backend/src/shared/types";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
axios.defaults.withCredentials = true;

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

export const deleteMyHotelImage = async (url: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/my-hotels/image`, {
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
