type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const MaxPriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md mb-2 font-semibold">Max Price</h4>
      <select
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
        className="w-full cursor-pointer rounded-md border p-2 focus:outline-none"
      >
        <option>Select Max Price</option>
        {[50, 100, 200, 300, 500, 600].map((price) => (
          <option value={price} key={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MaxPriceFilter;
