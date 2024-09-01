import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../../contexts/SearchContext";
import { GuestInfoFormData, Props } from "../../types/GuestInfoFormTypes";

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="rounded-md bg-blue-200 p-4">
      <h2 className="text-md pb-4 font-bold">${pricePerNight} per night</h2>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="space-y-3"
      >
        <div>
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="min-w-full rounded bg-white p-2 text-center focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className="min-w-full rounded bg-white p-2 text-center focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div className="flex gap-1 rounded bg-white px-2 py-1">
          <label className="flex flex-1 items-center">
            Adults:
            <input
              type="number"
              min={1}
              max={20}
              className="w-full p-1 font-bold focus:outline-none"
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="flex flex-1 items-center">
            Children:
            <input
              type="number"
              min={0}
              max={20}
              className="w-full p-1 font-bold focus:outline-none"
              {...register("childCount", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-sm font-semibold text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        {isLoggedIn ? (
          <button className="w-full rounded bg-blue-600 p-2 text-xl text-white duration-300 hover:bg-blue-700">
            Book now
          </button>
        ) : (
          <button className="w-full rounded bg-blue-600 p-2 text-xl text-white duration-300 hover:bg-blue-700">
            Sign in to book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;
