import { Router } from 'express';
import { v4 } from 'uuid';
import path from 'path';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      `D:\\Git\\LetsCode\\Turma905\\ExpressApiTypescript\\src\\content\\`
    );
  },
  filename: function (req, file, cb) {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

const userPhotoRoutes = Router();

userPhotoRoutes.post('/', upload.single('photo'), (req, res) => {
  if (req.file) {
    return res.json({
      file: req.file,
    });
  }

  return res.json({
    message: 'Error',
  });
});

export default userPhotoRoutes;
