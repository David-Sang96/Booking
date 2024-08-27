import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async (data) => {
      toast.success(data.message);
      navigate("/my-hotels");
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
