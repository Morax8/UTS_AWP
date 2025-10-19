const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authController"); // <-- Import registerUser

router.post("/login", loginUser);
router.post("/register", registerUser); // <-- Tambahkan route baru

module.exports = router;
