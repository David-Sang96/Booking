import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HotelFormData } from "../forms/ManageHotelForm/ManageHotelForm";

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

interface FileWithPreview extends File {
  preview: string;
}

const ReactDropZone = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { setValue, setError, clearErrors, watch } =
    useFormContext<HotelFormData>();
  const { hotelId } = useParams();

  const existingImagesUrls = watch("imageUrls");

  useEffect(() => {
    const totalLength = files.length + (existingImagesUrls?.length || 0);
    if (totalLength === 0) {
      setError("imagesFiles", {
        type: "manual",
        message: "At least one image must be upload",
      });
    }
  }, [files, setError, existingImagesUrls]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const acceptFileNames = acceptedFiles.map((file) => file.name);
      const droppedFileNames = files.map((file) => file.name);

      if (acceptFileNames.some((name) => droppedFileNames.includes(name))) {
        setError("imagesFiles", {
          type: "manual",
          message: "Uploading same image is not allowed",
        });
        return;
      }
      const invalidFiles = acceptedFiles.filter(
        (file) => !["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      );

      if (invalidFiles.length) {
        setError("imagesFiles", {
          type: "manual",
          message: "Only JPEG, JPG, and PNG files are allowed.",
        });
        return;
      }

      const totalFiles =
        files.length + acceptedFiles.length + existingImagesUrls?.length;
      if (totalFiles > 6) {
        setError("imagesFiles", {
          type: "manual",
          message: "Only 6 images are allowed.",
        });
        return;
      }

      clearErrors("imagesFiles");

      // instead of removing previous files, add more
      setFiles((previousFiles) => {
        const updatedFiles = [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            // add preview property to file
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ];
        setValue("imagesFiles", updatedFiles);
        return updatedFiles;
      });
    },
    [setValue, files, setError, clearErrors, existingImagesUrls],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024,
  });

  const removeFile = (name: string) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);

    setValue("imagesFiles", updatedFiles);

    const fileToRemove = files.find((file) => file.name === name);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
  };

  const handleDeleteSavedImage = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string,
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImagesUrls.filter((url) => url !== imageUrl),
    );
    const delImg = await apiClient.deleteMyHotelImage(imageUrl, hotelId || "");
    toast.success(delImg.message);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="flex items-center rounded-md border-2 border-dotted border-black p-12 focus:outline-none max-sm:p-6"
      >
        <input {...getInputProps()} />
        <div className="flex w-full cursor-pointer flex-col items-center text-blue-500">
          <FaCloudUploadAlt className="size-9" />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Preview Images */}
        <div className="flex flex-wrap gap-3">
          {files.map((file) => (
            <div key={file.name}>
              <p className="relative rounded-md bg-white p-2">
                <button
                  type="button"
                  onClick={() => removeFile(file.name)}
                  className="absolute -right-2 -top-2"
                >
                  <RxCross2 className="size-5 rounded-full bg-red-600 text-white" />
                </button>
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-28 w-28 rounded-md object-cover"
                  onLoad={() => {
                    //prevents memory leaks by freeing up the resources used by the temporary URLs
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </p>
              <p className="text-sm">{file.name.slice(0, 15)}</p>
            </div>
          ))}
        </div>
        {/* Preview existing images */}
        {existingImagesUrls?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {existingImagesUrls.map((url) => (
              <div key={url}>
                <p className="relative rounded-md bg-white p-2">
                  <button
                    type="button"
                    onClick={(e) => handleDeleteSavedImage(e, url)}
                    className="absolute -right-2 -top-2"
                  >
                    <RxCross2 className="size-5 rounded-full bg-red-600 text-white" />
                  </button>
                  <img
                    src={url}
                    alt="hotel image"
                    className="h-28 w-28 rounded-md object-cover"
                  />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactDropZone;
