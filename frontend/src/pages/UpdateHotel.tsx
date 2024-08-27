import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const UpdateHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { data: hotel } = useQuery(
    "getHotelDetails",
    () => apiClient.getMyHotelDetails(hotelId || ""),
    {
      enabled: !!hotelId,
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotel, {
    onSuccess: () => {
      toast.success("Updated hotel successfully");
      navigate("/my-hotels");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  if (!hotel) return <p>No Hotel Found</p>;

  return (
    <ManageHotelForm
      hotelDetails={hotel}
      onCreate={handleUpdate}
      isLoading={isLoading}
    />
  );
};

export default UpdateHotel;
