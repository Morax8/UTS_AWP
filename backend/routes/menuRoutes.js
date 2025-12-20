const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  getAllMenuItems,
  getFeaturedMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemsNoFilter,
} = require("../controllers/menuController");
const { protect } = require("../middleware/authMiddleware");

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
