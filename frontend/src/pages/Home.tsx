import { useQuery } from "react-query";

import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("getAllHotels", apiClient.getHotels);

  if (!hotels) return <span>No Hotels Found</span>;

  const topRowHotels = hotels.slice(0, 2) || [];
  const restRowHotels = hotels.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {restRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
