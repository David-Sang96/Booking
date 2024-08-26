import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

import toast from "react-hot-toast";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: async (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleCreateHotel = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onCreate={handleCreateHotel} isLoading={isLoading} />;
};

export default AddHotel;
