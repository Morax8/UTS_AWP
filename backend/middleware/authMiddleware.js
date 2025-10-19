const jwt = require("jsonwebtoken");
const db = require("../config/db");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Ambil token dari header
      token = req.headers.authorization.split(" ")[1];

      // 2. Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Ambil data user dari DB (tanpa password) dan pasang ke object req
      // Ini membuat data user tersedia di semua route yang dilindungi
      const query = "SELECT id, name, email, role FROM users WHERE id = ?";
      const [users] = await db.query(query, [decoded.userId]);

      if (users.length > 0) {
        req.user = users[0];
        next(); // Lanjutkan ke controller berikutnya
      } else {
        throw new Error("User tidak ditemukan");
      }
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({ success: false, message: "Tidak terautentikasi, token gagal" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({
        success: false,
        message: "Tidak terautentikasi, tidak ada token",
      });
  }
};

module.exports = { protect };
