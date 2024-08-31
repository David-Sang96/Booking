import { useParams } from "react-router-dom";

const HotelDetails = () => {
  const { hotelId } = useParams();
  console.log(hotelId);
  return <div>HotelDetails</div>;
};

export default HotelDetails;
