const express = require("express");
const router = express.Router();
const { trackOrder } = require("../controllers/ordersController");

// Rute untuk melacak pesanan
router.get("/track", trackOrder);

module.exports = router;
