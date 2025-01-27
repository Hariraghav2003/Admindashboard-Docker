const multer = require("multer");
const { ensureDirectoryExists } = require("../utils/Fileutils");
const path = require("path");
const { dateTimestampGenerator } = require("../utils/Timestampgenerator");
const fileCreatedon = dateTimestampGenerator();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = req.body.folderPath || "uploads";
    ensureDirectoryExists(folderPath);
    cb(null, path.join(__dirname, "..", folderPath));
  },
  filename: (req, file, cb) => {
    cb(null, fileCreatedon + path.extname(file.originalname));
  },
});

//Allowed file types
const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpeg",
];
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, //File size limit (e.g., 10MB)
});
module.exports = { upload };
