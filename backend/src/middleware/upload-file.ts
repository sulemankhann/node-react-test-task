import path from 'path';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const allowedExtentions = ['.png', 'jpeg'];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`),
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 100,
  },
  fileFilter: (req, file, cb) =>
    cb(null, allowedExtentions.includes(path.extname(file.originalname))),
});
const multerUploadFile = upload.single('file');

export default () => (req: Request, res: Response, next: NextFunction) =>
  multerUploadFile(req, res, next);
