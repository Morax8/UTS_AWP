const db = require("../config/db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// @desc    Get all active menu items with their categories
// @route   GET /api/menu
// @access  Public
const getAllMenuItems = async (req, res) => {
  try {
    console.log("Fetching all menu items...");
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
      LEFT JOIN menu_categories mc ON mi.category_id = mc.id
      WHERE mi.is_active = TRUE
      ORDER BY mi.id;
    `;

    const [rows] = await db.query(query);
    console.log("Menu items found:", rows.length);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

const getFeaturedMenuItems = async (req, res) => {
  try {
    console.log("Fetching featured menu items...");
    const query = `
      SELECT id, name, description, image_url, price
      FROM menu_items
      WHERE is_active = TRUE
      ORDER BY id DESC
      LIMIT 3;
    `;
    const [rows] = await db.query(query);
    console.log("Featured menu items found:", rows.length);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching featured menu items:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
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
    console.log("Creating new menu item:", {
      name,
      category_id,
      has_file: !!file,
    });

    // Proses Upload ke Cloudinary via Buffer
    console.log("Uploading image to Cloudinary...");
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "kateringku-menu",
          resource_type: "auto", // Biar aman kalau upload PDF/Video
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("Image uploaded successfully:", result.secure_url);
            resolve(result);
          }
        }
      );
      uploadStream.end(file.buffer); // Ini ambil dari MemoryStorage
    });
    const imageUrl = uploadResult.secure_url;

    // Convert is_active to integer (0 or 1)
    const isActive =
      is_active === true || is_active === 1 || is_active === "1" ? 1 : 0;

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
      isActive,
      imageUrl,
    ]);

    console.log("Menu item created successfully");
    res
      .status(201)
      .json({ success: true, message: "Menu baru berhasil ditambahkan." });
  } catch (error) {
    console.error("Error creating menu:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Gagal menambahkan menu.",
        error: error.message,
      });
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
    console.log("Updating menu item:", { id, name, has_file: !!file });

    let imageUrl;

    // kalau ada file baru, upload ke Cloudinary
    if (file) {
      console.log("Uploading new image to Cloudinary...");
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "kateringku-menu" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              console.log("Image uploaded successfully:", result.secure_url);
              resolve(result);
            }
          }
        );
        uploadStream.end(file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    // Convert is_active to integer (0 or 1)
    const isActive =
      is_active === true || is_active === 1 || is_active === "1" ? 1 : 0;

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
      ? [name, price, category_id, description, isActive, imageUrl, id]
      : [name, price, category_id, description, isActive, id];

    console.log("Update query params:", {
      query_type: file ? "with_image" : "no_image",
      params,
    });

    await db.query(query, params);

    console.log("Menu updated successfully");
    res
      .status(200)
      .json({ success: true, message: "Menu berhasil diperbarui." });
  } catch (error) {
    console.error("Error updating menu:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Gagal memperbarui menu.",
        error: error.message,
      });
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

