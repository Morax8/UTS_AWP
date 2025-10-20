const express = require("express");
const router = express.Router();
const { getAllCategories } = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

// Route ini dilindungi, hanya admin yang bisa akses
router.get("/", protect, getAllCategories);

module.exports = router;
