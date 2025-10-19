const db = require("../config/db");

// @desc    Track an order by code or customer name
// @route   GET /api/orders/track?search=...
// @access  Public
const trackOrder = async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res
      .status(400)
      .json({
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

module.exports = {
  trackOrder,
};
