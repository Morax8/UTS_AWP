const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/contactController");

// Rute untuk submit form
router.post("/", submitContactForm);

module.exports = router;
