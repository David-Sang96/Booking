type Props = {
  facilities: string[];
};

const FacilityCard = ({ facilities }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {facilities.slice(0, 3).map((facility) => (
        <div
          className="rounded-lg bg-gray-300 p-1.5 text-xs font-bold"
          key={facility}
        >
          {facility}
        </div>
      ))}
      <span className="text-sm">{`+${facilities.slice(2).length} more`}</span>
    </div>
  );
};

export default FacilityCard;
