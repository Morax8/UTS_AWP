const express = require("express");
const router = express.Router();
const { getSalesReport } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

// Route ini dilindungi, hanya admin yang bisa akses
router.get("/", protect, getSalesReport);

module.exports = router;
