import path from 'path';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const allowedExtentions = ['.png', '.jpeg', '.jpg'];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 15, // 15mb
    fileSize: 1024 * 1024 * 15, // 15mb
  },
  fileFilter: (req, file, cb) => {
    if (!allowedExtentions.includes(path.extname(file.originalname))) {
      cb(new Error('File extention is not supported'));
    } else {
      cb(null, true);
    }
  },
});
const multerUploadFile = upload.single('file');

export default () => (req: Request, res: Response, next: NextFunction) =>
  multerUploadFile(req, res, next);
