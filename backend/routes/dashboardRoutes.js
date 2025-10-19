const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

// Route ini akan dilindungi, hanya bisa diakses dengan token JWT yang valid
router.get("/stats", protect, getDashboardStats);

module.exports = router;
