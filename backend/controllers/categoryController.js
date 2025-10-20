const db = require("../config/db");

// @desc    Get all menu categories
// @route   GET /api/categories
// @access  Private (Admin)
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM menu_categories ORDER BY name ASC"
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAllCategories,
};
