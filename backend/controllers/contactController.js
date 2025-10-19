const db = require("../config/db");

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  // Validasi sederhana di sisi server
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Semua field (Nama, Email, dan Pesan) wajib diisi.",
    });
  }

  try {
    const query = `
      INSERT INTO contact_messages (name, email, message, status) 
      VALUES (?, ?, ?, 'Baru')
    `;

    await db.query(query, [name, email, message]);

    res.status(201).json({
      success: true,
      message: "Pesan Anda telah terkirim! Terima kasih.",
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error. Gagal mengirim pesan." });
  }
};

module.exports = {
  submitContactForm,
};
