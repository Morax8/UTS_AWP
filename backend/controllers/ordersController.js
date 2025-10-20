const db = require("../config/db");

// --- Fungsi trackOrder yang sudah ada ---
const trackOrder = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({
      success: false,
      message: "Parameter pencarian tidak boleh kosong.",
    });
  }

  try {
    // Langkah 1: Cari data pesanan utama
    const orderQuery = `
      SELECT id, order_code, customer_name, status, total_amount 
      FROM orders 
      WHERE order_code = ? OR customer_name LIKE ?
      LIMIT 1;
    `;
    const [orders] = await db.query(orderQuery, [search, `%${search}%`]);

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Pesanan tidak ditemukan." });
    }

    const orderData = orders[0];

    // Langkah 2: Ambil item-item yang terkait dengan pesanan tersebut
    const itemsQuery = `
      SELECT oi.quantity, oi.unit_price, mi.name AS menu_name
      FROM order_items oi
      JOIN menu_items mi ON oi.menu_item_id = mi.id
      WHERE oi.order_id = ?;
    `;
    const [items] = await db.query(itemsQuery, [orderData.id]);

    // Gabungkan hasilnya
    const finalResponse = {
      ...orderData,
      items: items,
    };

    res.status(200).json({
      success: true,
      data: finalResponse,
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// --- FUNGSI BARU UNTUK MEMBUAT PESANAN ---
// @desc    Create a new order
// @route   POST /api/orders
// @access  Public (atau Private jika user_id wajib)
const createOrder = async (req, res) => {
  const {
    customer_name,
    customer_phone,
    customer_address,
    total_amount,
    items, // Ini adalah array [ { menu_item_id, quantity, unit_price }, ... ]
    user_id, // Opsional, bisa null jika guest
  } = req.body;

  // Validasi dasar
  if (
    !customer_name ||
    !customer_phone ||
    !customer_address ||
    !total_amount ||
    !items ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Data pesanan tidak lengkap." });
  }

  // Generate order_code unik (Contoh: KTG-YYYYMMDD-XXX)
  const date = new Date();
  const dateString = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  // Kita butuh query untuk mendapatkan nomor urut terakhir hari ini,
  // tapi untuk simplifikasi, kita pakai timestamp unik sementara
  const uniqueSuffix = Date.now().toString().slice(-4); // Ambil 4 digit terakhir timestamp
  const order_code = `KTG-${dateString}-${uniqueSuffix}`;

  // Gunakan transaksi agar data konsisten
  const connection = await db.getConnection(); // Dapatkan koneksi dari pool

  try {
    await connection.beginTransaction(); // Mulai transaksi

    // 1. Insert ke tabel 'orders'
    const orderQuery = `
      INSERT INTO orders (order_code, user_id, customer_name, customer_phone, customer_address, total_amount, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [orderResult] = await connection.query(orderQuery, [
      order_code,
      user_id || null, // Pastikan null jika user_id tidak ada
      customer_name,
      customer_phone,
      customer_address,
      total_amount,
      "Pesanan Diterima", // Status awal
    ]);

    const orderId = orderResult.insertId; // Ambil ID dari pesanan yang baru dibuat

    // 2. Insert ke tabel 'order_items' (looping)
    const itemQuery = `
      INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price) 
      VALUES (?, ?, ?, ?)
    `;
    for (const item of items) {
      await connection.query(itemQuery, [
        orderId,
        item.menu_item_id,
        item.quantity,
        item.unit_price,
      ]);
    }

    // Jika semua query berhasil, commit transaksi
    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat!",
      order_code: order_code, // Kirim kembali order_code
    });
  } catch (error) {
    // Jika ada error, rollback transaksi
    await connection.rollback();
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Gagal membuat pesanan." });
  } finally {
    // Selalu lepaskan koneksi kembali ke pool
    connection.release();
  }
};

// --- FUNGSI UNTUK AMBIL SEMUA PESANAN ---
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS order_id,
        o.order_code,
        o.customer_name,
        o.total_amount,
        o.status,
        mi.name AS menu_name,
        oi.quantity
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
      ORDER BY o.id DESC;
    `);

    const ordersMap = {};
    rows.forEach((row) => {
      if (!ordersMap[row.order_id]) {
        ordersMap[row.order_id] = {
          id: row.order_id,
          order_code: row.order_code,
          customer_name: row.customer_name,
          total_amount: row.total_amount,
          status: row.status,
          items: [],
        };
      }

      if (row.menu_name) {
        ordersMap[row.order_id].items.push({
          menu_name: row.menu_name,
          quantity: row.quantity,
        });
      }
    });

    res.json({ success: true, data: Object.values(ordersMap) });
  } catch (err) {
    console.error("Gagal ambil data:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE STATUS PESANAN
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
    res.json({ success: true, message: "Status pesanan berhasil diperbarui." });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal memperbarui status." });
  }
};

// HAPUS PESANAN
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM orders WHERE id = ?", [id]);
    res.json({ success: true, message: "Pesanan berhasil dihapus." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal menghapus pesanan." });
  }
};

module.exports = {
  trackOrder,
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
