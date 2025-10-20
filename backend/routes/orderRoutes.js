const express = require("express");
const router = express.Router();
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

router.get("/", getAllOrders); // buat admin
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
