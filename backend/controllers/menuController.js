const db = require("../config/db");
require("dotenv").config();
const { UploadManager } = require("@bytescale/sdk");
const uploadManager = new UploadManager({
  apiKey: process.env.BYTESCALE_API_KEY,
});
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
        mi.is_active, 
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
    console.log("Fetching featured menu items...");
    const query = `
      SELECT id, name, description, image_url 
      FROM menu_items
      WHERE is_active = TRUE AND is_featured = TRUE
      ORDER BY id DESC
      LIMIT 3;
    `;
    const [rows] = await db.query(query);
    console.log("Featured menu items found:", rows.length);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching featured menu items:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Private (Admin)
const createMenuItem = async (req, res) => {
  const { name, price, category_id, description, is_active } = req.body;
  const file = req.file;

  if (!name || !price || !category_id || !file) {
    return res.status(400).json({
      success: false,
      message: "Nama, harga, kategori, dan gambar wajib diisi.",
    });
  }

  try {
    // --- PERBAIKAN 3: Gunakan method 'upload' dari UploadManager ---
    const { fileUrl } = await uploadManager.upload({
      data: req.file.buffer,
      mime: req.file.mimetype,
      originalFileName: req.file.originalname,
    });

    const imageUrl = fileUrl; // URL gambar dari Bytescale

    // Simpan URL ke database
    const query = `
      INSERT INTO menu_items (name, price, category_id, description, is_active, image_url) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      name,
      price,
      category_id,
      description,
      is_active,
      imageUrl,
    ]);

    res
      .status(201)
      .json({ success: true, message: "Menu baru berhasil ditambahkan." });
  } catch (error) {
    console.error("Error creating menu:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal menambahkan menu." });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private (Admin)
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, category_id, description, is_active } = req.body;
  const file = req.file; // ambil file baru kalau ada

  if (!name || !price || !category_id) {
    return res.status(400).json({
      success: false,
      message: "Nama, harga, dan kategori wajib diisi.",
    });
  }

  try {
    let imageUrl;

    // kalau ada file baru, upload ke Bytescale
    if (file) {
      const { fileUrl } = await uploadManager.upload({
        data: file.buffer,
        mime: file.mimetype,
        originalFileName: file.originalname,
      });
      imageUrl = fileUrl;
    }

    // kalau gak ada file baru, jangan ubah image_url di DB
    const query = file
      ? `
          UPDATE menu_items 
          SET name = ?, price = ?, category_id = ?, description = ?, is_active = ?, image_url = ?
          WHERE id = ?
        `
      : `
          UPDATE menu_items 
          SET name = ?, price = ?, category_id = ?, description = ?, is_active = ?
          WHERE id = ?
        `;

    const params = file
      ? [name, price, category_id, description, is_active, imageUrl, id]
      : [name, price, category_id, description, is_active, id];

    await db.query(query, params);

    res
      .status(200)
      .json({ success: true, message: "Menu berhasil diperbarui." });
  } catch (error) {
    console.error("Error updating menu:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal memperbarui menu." });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private (Admin)
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    // Hapus dulu dari order_items untuk menghindari error foreign key
    await db.query("DELETE FROM order_items WHERE menu_item_id = ?", [id]);
    // Baru hapus dari menu_items
    await db.query("DELETE FROM menu_items WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Menu berhasil dihapus." });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ success: false, message: "Gagal menghapus menu." });
  }
};

// @desc Get all menu items (tanpa filter aktif)
// @route GET /api/menu/all
// @access Private (Admin)
const getAllMenuItemsNoFilter = async (req, res) => {
  try {
    const query = `
      SELECT 
        mi.id, 
        mi.name, 
        mi.description, 
        mi.price, 
        mi.image_url,
        mi.is_active, 
        mi.category_id,
        mc.name AS category_name 
      FROM menu_items mi
      JOIN menu_categories mc ON mi.category_id = mc.id
      ORDER BY mi.id;
    `;
    const [rows] = await db.query(query);
    res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAllMenuItems,
  getFeaturedMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemsNoFilter,
};
