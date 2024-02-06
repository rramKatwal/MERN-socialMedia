import multer from "multer";
import fs from "fs";
import path from "path";

const imageFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    return cb(null, true);
  } else {
    return cb(new Error("Only image files are allowed!"), false);
  }
};
const videoFilter = (req, file, cb) => {
  const allowedExtensions = [".mp4", ".mov", ".gif"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    return cb(null, true);
  } else {
    return cb(new Error("Only video files are allowed!"), false);
  }
};

const imgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const uploadFolder = "public/images";
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }
      cb(null, uploadFolder);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const uploadFolder = "public/videos";
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }
      cb(null, uploadFolder);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const imageUpload = multer({
  storage: imgStorage,
  fileFilter: imageFilter,
});
export const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFilter,
});
