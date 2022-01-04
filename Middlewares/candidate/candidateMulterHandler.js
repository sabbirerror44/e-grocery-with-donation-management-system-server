const multer = require("multer");
const path = require("path");

const candidateMulterHandler = {};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});
candidateMulterHandler.upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Please select pdf format"));
    }
  },
});

module.exports = candidateMulterHandler;
