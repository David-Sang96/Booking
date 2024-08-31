import { AiFillStar } from "react-icons/ai";

import { Link } from "react-router-dom";
import { HotelDataType } from "../../../backend/src/shared/types";
import FacilityCard from "./FacilityCard";

type Props = {
  hotel: HotelDataType;
};

const SearchResultCard = ({ hotel }: Props) => {
  const {
    _id,

    type,
    starRating,
    pricePerNight,
    name,
    imageUrls,
    facilities,
    description,
  } = hotel;

  return (
    <div className="grid gap-8 rounded-lg border border-slate-300 p-4 xl:grid-cols-[2fr_3fr]">
      <div className="h-[300px] w-full">
        <img
          src={imageUrls[0]}
          alt="hotel image"
          className="size-full rounded-md object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: starRating }).map((_, i) => (
                <AiFillStar className="fill-blue-500" key={i} />
              ))}
            </span>
            <span className="text-sm">{type}</span>
          </div>
          <Link
            to={`/details/${_id}`}
            className="cursor-pointer text-2xl font-bold"
          >
            {name}
          </Link>
        </div>
        <div className="line-clamp-4">{description}</div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <FacilityCard facilities={facilities} />
          <div className="flex flex-col items-end gap-1 font-bold">
            <p className="">${pricePerNight} per night</p>
            <Link
              to={`/details/${_id}`}
              className="h-full max-w-fit rounded bg-blue-500 p-1.5 text-white duration-300 hover:bg-blue-600"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
