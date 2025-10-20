const db = require("../config/db");

// @desc    Get sales report with filters
// @route   GET /api/reports?month=...&year=...
// @access  Private (Admin)
const getSalesReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    let query = `
      SELECT o.id, o.order_code, o.created_at, o.total_amount, o.status, u.name AS customer_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE YEAR(o.created_at) = ?
    `;
    const params = [year];

    // cuma tambahin filter bulan kalo month ≠ "all"
    if (month && month !== "all") {
      query += " AND MONTH(o.created_at) = ?";
      params.push(month);
    }

    query += " ORDER BY o.created_at DESC";

    const [report] = await db.query(query, params);

    // hitung summary
    const totalOrders = report.length;
    const totalRevenue = report.reduce(
      (acc, cur) => acc + (cur.total_amount || 0),
      0
    );

    res.status(200).json({
      success: true,
      data: { report, summary: { totalOrders, totalRevenue } },
    });
  } catch (err) {
    console.error("Error fetching report:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getSalesReport,
};
