const db = require("../config/db");

// @desc    Get all active menu items with their categories
// @route   GET /api/menu
// @access  Public
const getAllMenuItems = async (req, res) => {
  try {
    const query = `
      SELECT 
        mi.id, 
        mi.name, 
        mi.description, 
        mi.price, 
        mi.image_url, 
        mc.name AS category_name 
      FROM menu_items mi
      JOIN menu_categories mc ON mi.category_id = mc.id
      WHERE mi.is_active = TRUE
      ORDER BY mi.id;
    `;

    const [rows] = await db.query(query);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getFeaturedMenuItems = async (req, res) => {
  try {
    const query = `
      SELECT id, name, description, image_url 
      FROM menu_items
      WHERE is_active = TRUE AND is_featured = TRUE
      ORDER BY id DESC
      LIMIT 3;
    `;
    const [rows] = await db.query(query);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAllMenuItems,
  getFeaturedMenuItems,
};
