import { useFormContext } from "react-hook-form";
import ReactDropZone from "../../components/ReactDropZone";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Images</h1>
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
