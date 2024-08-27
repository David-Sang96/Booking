import cloudinary from './cloudinary';

export const saveToCloudinary = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    // convert image to base64 string to be able to process by cloudinary
    const b64 = Buffer.from(image.buffer).toString('base64');
    const dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const response = await cloudinary.uploader.upload(dataURI);
    return response.url;
  });
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};
