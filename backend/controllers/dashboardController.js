const db = require("../config/db");

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    console.log("Fetching dashboard stats...");

    // 1. Statistik Utama
    const [ordersThisMonth] = await db.query(
      `SELECT COUNT(id) as totalOrders FROM orders WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`
    );
    const [revenueThisMonth] = await db.query(
      `SELECT SUM(total_amount) as totalRevenue FROM orders WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`
    );
    const [totalCustomers] = await db.query(
      `SELECT COUNT(id) as totalUsers FROM users WHERE role = 'user' OR role = 'customer'`
    );

    // 2. Data untuk Tabel & Grafik Menu Terlaris
    const [topMenus] = await db.query(
      `SELECT mi.name, SUM(oi.quantity) as total_sold
       FROM order_items oi
       JOIN menu_items mi ON oi.menu_item_id = mi.id
       GROUP BY mi.id
       ORDER BY total_sold DESC
       LIMIT 5` // Ambil 5 teratas
    );

    // 3. Data untuk Grafik Pemasukan Harian (7 hari terakhir)
    const [dailySales] = await db.query(
      `SELECT DATE_FORMAT(created_at, '%d %b') as day, SUM(total_amount) as sales 
       FROM orders 
       WHERE created_at >= CURDATE() - INTERVAL 7 DAY
       GROUP BY DATE(created_at)
       ORDER BY DATE(created_at) ASC`
    );

    // 4. Data untuk Proporsi Penjualan Kategori
    const [categorySales] = await db.query(
      `SELECT mc.name, SUM(oi.quantity * oi.unit_price) as category_total
       FROM order_items oi
       JOIN menu_items mi ON oi.menu_item_id = mi.id
       JOIN menu_categories mc ON mi.category_id = mc.id
       JOIN orders o ON oi.order_id = o.id
       WHERE MONTH(o.created_at) = MONTH(CURDATE()) AND YEAR(o.created_at) = YEAR(CURDATE())
       GROUP BY mc.id, mc.name
       ORDER BY category_total DESC`
    );

    const stats = {
      totalOrdersThisMonth: ordersThisMonth[0].totalOrders || 0,
      totalRevenueThisMonth: revenueThisMonth[0].totalRevenue || 0,
      totalCustomers: totalCustomers[0].totalUsers || 0,
      topMenus: topMenus,
      dailySales: dailySales,
      categorySales: categorySales,
    };

    console.log("Dashboard stats:", stats);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
