const multer = require("multer");

// Simpan file di memori sementara (RAM)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  // Batas ukuran file 5MB
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  // Filter untuk memastikan hanya file gambar yang di-upload
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diizinkan!"), false);
    }
  },
});

module.exports = upload;
