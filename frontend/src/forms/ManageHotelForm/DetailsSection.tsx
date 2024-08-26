import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const InputStyles =
    "w-full rounded border-2 px-2 py-2 font-normal focus:outline-none ";

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-3 text-3xl font-bold">Add Hotel</h1>
      <label>
        <span className="inline-block pb-2 font-medium">Name</span>
        <input
          type="text"
          autoComplete="username"
          className={twMerge(InputStyles, errors.name && "border-red-300")}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-sm font-bold text-red-500">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-4 max-md:flex-col">
        <label className="w-full">
          <span className="inline-block pb-2 font-medium">City</span>
          <input
            type="text"
            autoComplete="username"
            className={twMerge(InputStyles, errors.city && "border-red-300")}
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className="text-sm font-bold text-red-500">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="w-full">
          <span className="inline-block pb-2 font-medium">Country</span>
          <input
            type="text"
            autoComplete="username"
            className={twMerge(InputStyles, errors.country && "border-red-300")}
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="text-sm font-bold text-red-500">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>

      <label>
        <span className="inline-block pb-2 font-medium">Description</span>
        <textarea
          rows={10}
          className={twMerge(
            InputStyles,
            errors.description && "border-red-300",
          )}
          {...register("description", { required: "Description is required" })}
        ></textarea>

        {errors.description && (
          <span className="text-sm font-bold text-red-500">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="max-w-[50%]">
        <span className="inline-block pb-2 font-medium">Price Per Night</span>
        <input
          type="number"
          min={1}
          autoComplete="username"
          className={twMerge(
            InputStyles,
            errors.pricePerNight && "border-red-300",
          )}
          {...register("pricePerNight", {
            required: "Price Per Night is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-sm font-bold text-red-500">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label className="max-w-[50%]">
        <span className="inline-block pb-2 font-medium">Star Rating</span>
        <select
          {...register("starRating", { required: "Star Rating is required" })}
          className={twMerge(
            InputStyles,
            errors.pricePerNight && "border-red-300",
          )}
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-sm font-bold text-red-500">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
