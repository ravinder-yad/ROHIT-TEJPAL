import multer from "multer";

// Configure multer to use memory storage
// The file buffer will be passed to Cloudinary directly
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are supported!"), false);
    }
  },
});

export default upload;
