import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdTravelExplore } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  // duplicating these cuz only want to store values in global variables after submit so let values store in local state variables first before submit
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 grid grid-cols-2 items-center gap-3 rounded bg-orange-400 p-3 shadow-md lg:grid-cols-3 2xl:grid-cols-5"
    >
      <div className="flex items-center gap-2 rounded bg-white p-2">
        <MdTravelExplore size={25} />
        <input
          type="text"
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
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
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <label className="flex flex-1 items-center">
          Children:
          <input
            type="number"
            min={1}
            max={20}
            className="w-full p-1 font-bold focus:outline-none"
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
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
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
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
      <div className="item-center flex justify-center gap-1.5 font-bold">
        <button
          type="submit"
          className="w-2/3 rounded bg-blue-500 p-2 text-white duration-300 hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
        <button
          type="button"
          className="flex-1 rounded bg-red-500 p-2 text-white duration-300 hover:bg-red-600 focus:outline-none"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
