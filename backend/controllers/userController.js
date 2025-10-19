const db = require("../config/db");

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // Data user (req.user) sudah diambil oleh middleware 'protect'
  // Kita hanya perlu mengambil data lengkapnya dari DB termasuk phone dan address
  try {
    const query =
      "SELECT id, name, email, phone, address, role FROM users WHERE id = ?";
    const [users] = await db.query(query, [req.user.id]);

    if (users.length > 0) {
      res.status(200).json({ success: true, data: users[0] });
    } else {
      res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  // Tambahkan phone dan address dari req.body
  const { name, email, phone, address } = req.body;
  const userId = req.user.id;

  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Nama dan email tidak boleh kosong" });
  }

  try {
    // Perbarui query UPDATE
    const query =
      "UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
    await db.query(query, [name, email, phone, address, userId]);

    // Ambil data terbaru untuk dikirim kembali
    const updatedUser = {
      id: userId,
      name,
      email,
      phone,
      address,
      role: req.user.role,
    };

    res.status(200).json({
      success: true,
      message: "Profil berhasil diperbarui",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email sudah digunakan oleh akun lain.",
        });
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
