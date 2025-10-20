const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Pastikan createOrder sudah di-import
const {
  trackOrder,
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/ordersController");

// Rute untuk melacak pesanan
router.get("/track", trackOrder);

// Rute untuk membuat pesanan baru
router.post("/", createOrder);

// Rute admin - perlu authentication
router.get("/", protect, getAllOrders); // buat admin
router.put("/:id/status", protect, updateOrderStatus);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
