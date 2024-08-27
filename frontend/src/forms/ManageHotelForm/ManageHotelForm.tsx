import { FormProvider, useForm } from "react-hook-form";
import { PiSpinnerBold } from "react-icons/pi";

import { useEffect } from "react";
import { HotelDataType } from "../../../../backend/src/shared/types";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imagesFiles: File[];
  imageUrls: string[];
};

type Props = {
  isLoading: boolean;
  onCreate: (hotelFormData: FormData) => void;
  hotelDetails?: HotelDataType;
};

const ManageHotelForm = ({ onCreate, isLoading, hotelDetails }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotelDetails);
  }, [hotelDetails, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotelDetails) {
      formData.append("hotelId", hotelDetails._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility) =>
      formData.append(`facilities`, facility),
    );

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url) =>
        formData.append(`imageUrls`, url),
      );
    }

    if (formDataJson.imagesFiles) {
      formDataJson.imagesFiles.forEach((imageFile) =>
        formData.append("imagesFiles", imageFile),
      );
    }
    onCreate(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-5 max-md:px-10 lg:px-20"
        onSubmit={onSubmit}
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />

        <div className="mt-3 flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className={`flex items-center gap-1 rounded border border-blue-800 bg-slate-50 px-3 py-2 text-sm duration-300 hover:bg-blue-800 hover:text-white md:text-base ${isLoading && "cursor-not-allowed"}`}
          >
            {isLoading && <PiSpinnerBold className="size-6 animate-spin" />}
            <p> {hotelDetails?._id ? "Update" : "Create "}</p>
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
