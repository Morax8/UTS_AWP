const express = require("express");
const router = express.Router();
// Pastikan createOrder sudah di-import
const { trackOrder, createOrder } = require("../controllers/ordersController");

// Rute untuk melacak pesanan
router.get("/track", trackOrder);

// Rute untuk membuat pesanan baru
router.post("/", createOrder); // <-- TAMBAHKAN INI

module.exports = router;
