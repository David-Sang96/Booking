import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  // If the original file name is "example.jpg", path.extname(file.originalname) will return ".jpg".
  const extName = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png)'));
  }
};

const upload = multer({
  storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, // 5MB (1024 * 1024 = 1 MB)
  },
  fileFilter,
}).array('imagesFiles', 6); // allow images to upload up to 6

export default upload;
