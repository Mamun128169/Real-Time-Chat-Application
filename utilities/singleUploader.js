// external imports
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const uploader = (
  subFolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) => {
  // file upload folder
  const upload_folder = path.join(
    __dirname,
    `../public/uploads/${subFolder_path}`
  );

  // define a storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, upload_folder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") + Date.now();
      cb(null, fileName + fileExt);
    },
  });

  // multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
};

module.exports = uploader;
