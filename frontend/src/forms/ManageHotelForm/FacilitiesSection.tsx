import { useForm } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useForm<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Facilities</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-white px-4 py-2 shadow"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              className="relative size-[16px] appearance-none rounded-full border border-gray-400 checked:border-purple-500 checked:bg-purple-500"
            />
            <p className="overflow-hidden text-ellipsis text-sm">{facility}</p>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-sm font-bold text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
