import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedTypes: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md mb-2 font-semibold">Hotel Type</h4>
      {hotelTypes.map((type) => (
        <label className="flex items-center gap-2" key={type}>
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type} </span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
