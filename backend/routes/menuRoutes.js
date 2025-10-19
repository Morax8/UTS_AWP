const express = require("express");
const router = express.Router();
const {
  getAllMenuItems,
  getFeaturedMenuItems,
} = require("../controllers/menuController");

// Rute untuk mendapatkan semua item menu
router.get("/", getAllMenuItems);
router.get("/featured", getFeaturedMenuItems); // <-- Tambahkan ini
module.exports = router;
