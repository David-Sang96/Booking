import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import ReactDropZone from "../../components/ReactDropZone";
import { HotelFormData } from "../../types/hotelFormDataTypes";

const ImagesSection = () => {
  const {
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const { hotelId } = useParams();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Images{" "}
        {!hotelId && (
          <span className="text-sm">( Upload at least one image )</span>
        )}
      </h1>
      <ReactDropZone />
      {errors.imagesFiles && (
        <span className="text-sm font-bold text-red-500">
          {errors.imagesFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
