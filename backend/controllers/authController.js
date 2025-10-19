const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  // Ambil data phone dan address dari body request
  const { name, email, password, phone, address } = req.body;

  // Validasi input, sekarang phone dan address juga wajib
  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Semua field wajib diisi.",
    });
  }

  try {
    // Cek apakah email sudah terdaftar
    const userExistsQuery = "SELECT id FROM users WHERE email = ?";
    const [existingUsers] = await db.query(userExistsQuery, [email]);

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email sudah terdaftar." });
    }

    // Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user baru ke database dengan data yang lebih lengkap
    const insertQuery =
      "INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(insertQuery, [
      name,
      email,
      hashedPassword,
      phone,
      address,
      "customer",
    ]);

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil! Silakan login.",
    });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email dan password wajib diisi." });
  }

  try {
    const query =
      "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1";
    const [users] = await db.query(query, [email]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah." });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email atau password salah." });
    }

    const payload = {
      userId: user.id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login berhasil!",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
