import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
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
  imagesFiles: FileList;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  // const mutation = useMutation(apiClient.register, {
  //   onSuccess: async () => {},
  //   onError: async () => {},
  // });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-5 max-md:px-10 lg:px-20">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <button
          // disabled={mutation.isLoading}
          type="submit"
          className={`flex items-center gap-1 rounded border border-blue-800 bg-slate-50 px-3 py-2 text-sm duration-300 hover:bg-blue-800 hover:text-white md:text-base`}
        >
          {/* {mutation.isLoading && (
            <PiSpinnerBold className="size-6 animate-spin" />
          )} */}
          <p> Login</p>
        </button>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
