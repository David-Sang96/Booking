import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";

import { useEffect, useState } from "react";
import * as apiClient from "../api-client";
import FacilitiesFilter from "../components/FacilitiesFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import MaxPriceFilter from "../components/MaxPriceFilter";
import Pagination from "../components/Pagination";
import SearchResultCard from "../components/SearchResultCard";
import StarRatingFilter from "../components/StarRatingFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.getSearchHotels(searchParams),
  );

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;
    setSelectedStars((prev) =>
      e.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating),
    );
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setSelectedTypes((prev) =>
      e.target.checked
        ? [...prev, selectedType]
        : prev.filter((type) => type !== selectedType),
    );
  };

  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFacility = e.target.value;
    setSelectedFacilities((prev) =>
      e.target.checked
        ? [...prev, selectedFacility]
        : prev.filter((facility) => facility !== selectedFacility),
    );
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
      <div className="sticky top-10 h-fit rounded-lg border border-slate-300 p-5 shadow">
        <div className="space-y-5">
          <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
            Filter by:
          </h3>
          <StarRatingFilter
            onChange={handleStarsChange}
            selectedStars={selectedStars}
          />
          <HotelTypesFilter
            selectedTypes={selectedTypes}
            onChange={handleTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <MaxPriceFilter
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* TODO sort options */}

          <select className="cursor-pointer rounded-md px-1 py-1.5 focus:outline-none">
            <option value="">Sort By</option>
            <option value="star rating">Star Rating</option>
            <option value="price per night (low to high)">
              Price Per Night ( low to high )
            </option>
            <option value="price per night (high to low)">
              Price Per Night ( high to low )
            </option>
          </select>
        </div>
        {hotelData?.hotels.map((hotel) => (
          <SearchResultCard hotel={hotel} key={hotel._id} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
