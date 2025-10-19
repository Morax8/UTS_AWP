const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Gabungkan GET dan PUT untuk route '/profile' yang sama
// Keduanya dilindungi oleh middleware 'protect'
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
