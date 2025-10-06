const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Contoh route API sederhana
app.get("/api/message", (req, res) => {
  res.json({ message: "Halo dari server Express!" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
