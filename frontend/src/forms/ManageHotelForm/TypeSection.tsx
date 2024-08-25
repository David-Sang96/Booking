import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Type</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm shadow duration-300 hover:bg-blue-300 ${
              typeWatch === type ? "bg-blue-300 text-white" : "bg-white"
            }`}
          >
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type", { required: "Type is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-sm font-bold text-red-500">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
