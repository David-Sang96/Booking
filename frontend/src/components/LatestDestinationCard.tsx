import { Link } from "react-router-dom";
import { HotelDataType } from "../../../backend/src/shared/types";

interface Props {
  hotel: HotelDataType;
}

const LatestDestinationCard = ({ hotel }: Props) => {
  console.log(hotel);
  return (
    <Link
      to={`/details/${hotel._id}`}
      className="group relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt="hotel images"
          className="h-full w-full rounded object-cover"
        />
      </div>
      <div className="absolute -bottom-28 left-0 w-full bg-black bg-opacity-50 p-4 text-center text-white transition-all duration-300 ease-in-out group-hover:bottom-0">
        {hotel.name}
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
