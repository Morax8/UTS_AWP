const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getAllMenuItems,
  getFeaturedMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemsNoFilter,
} = require("../controllers/menuController");
const { protect } = require("../middleware/authMiddleware");

// Setup multer (pakai memory storage biar bisa dikirim ke Bytescale)
const upload = multer();

// Rute Publik
router.get("/", getAllMenuItems);
router.get("/all", protect, getAllMenuItemsNoFilter);
router.get("/featured", getFeaturedMenuItems);

// Rute Admin
router.post("/", protect, upload.single("image"), createMenuItem);
router
  .route("/:id")
  .put(protect, upload.single("image"), updateMenuItem)
  .delete(protect, deleteMenuItem);

module.exports = router;
