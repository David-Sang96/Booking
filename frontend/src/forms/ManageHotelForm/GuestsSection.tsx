import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { HotelFormData } from "../../types/hotelFormDataTypes";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const InputStyles =
    "w-full rounded border-2 px-2 py-2 font-normal focus:outline-none ";

  return (
    <div>
      <h1 className="mb-3 text-2xl font-bold">Guests</h1>
      <div className="flex gap-4 max-md:flex-col">
        <label className="w-full">
          <span className="inline-block pb-2 text-sm font-semibold">
            Adults
          </span>
          <input
            type="number"
            min={1}
            className={twMerge(
              InputStyles,
              errors.adultCount && "border-red-300",
            )}
            {...register("adultCount", { required: "Adult is required" })}
          />
          {errors.adultCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="w-full">
          <span className="inline-block pb-2 text-sm font-semibold">
            Children
          </span>
          <input
            type="number"
            min={0}
            className={twMerge(
              InputStyles,
              errors.childCount && "border-red-300",
            )}
            {...register("childCount", { required: "Children is required" })}
          />
          {errors.childCount && (
            <span className="text-sm font-bold text-red-500">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
