const express = require("express");
const router = express.Router();
const { getAllMenuItems } = require("../controllers/menuController");

// Rute untuk mendapatkan semua item menu
router.get("/", getAllMenuItems);

module.exports = router;
