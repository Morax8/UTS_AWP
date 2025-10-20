const db = require("../config/db");

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    console.log("Fetching dashboard stats...");

    // Initialize default values
    let ordersThisMonth = 0;
    let revenueThisMonth = 0;
    let totalCustomers = 0;
    let topMenus = [];
    let dailySales = [];
    let categorySales = [];

    // 1. Statistik Utama - dengan error handling
    try {
      const [ordersResult] = await db.query(
        `SELECT COUNT(id) as totalOrders FROM orders WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`
      );
      ordersThisMonth = ordersResult[0]?.totalOrders || 0;
    } catch (err) {
      console.log("Orders query failed:", err.message);
    }

    try {
      const [revenueResult] = await db.query(
        `SELECT SUM(total_amount) as totalRevenue FROM orders WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`
      );
      revenueThisMonth = revenueResult[0]?.totalRevenue || 0;
    } catch (err) {
      console.log("Revenue query failed:", err.message);
    }

    try {
      const [customersResult] = await db.query(
        `SELECT COUNT(id) as totalUsers FROM users WHERE role = 'user' OR role = 'customer'`
      );
      totalCustomers = customersResult[0]?.totalUsers || 0;
    } catch (err) {
      console.log("Customers query failed:", err.message);
    }

    // 2. Data untuk Tabel & Grafik Menu Terlaris - dengan error handling
    try {
      const [topMenusResult] = await db.query(
        `SELECT mi.name, SUM(oi.quantity) as total_sold
         FROM order_items oi
         JOIN menu_items mi ON oi.menu_item_id = mi.id
         GROUP BY mi.id, mi.name
         ORDER BY total_sold DESC
         LIMIT 5`
      );
      topMenus = topMenusResult;
    } catch (err) {
      console.log("Top menus query failed:", err.message);
    }

    // 3. Data untuk Grafik Pemasukan Harian - dengan error handling
    try {
      const [dailySalesResult] = await db.query(
        `SELECT DATE_FORMAT(created_at, '%d %b') as day, SUM(total_amount) as sales 
         FROM orders 
         WHERE created_at >= CURDATE() - INTERVAL 7 DAY
         GROUP BY DATE(created_at), DATE_FORMAT(created_at, '%d %b')
         ORDER BY DATE(created_at) ASC`
      );
      dailySales = dailySalesResult;
    } catch (err) {
      console.log("Daily sales query failed:", err.message);
    }

    // 4. Data untuk Proporsi Penjualan Kategori - dengan error handling
    try {
      const [categorySalesResult] = await db.query(
        `SELECT mc.name, SUM(oi.quantity * oi.unit_price) as category_total
         FROM order_items oi
         JOIN menu_items mi ON oi.menu_item_id = mi.id
         JOIN menu_categories mc ON mi.category_id = mc.id
         JOIN orders o ON oi.order_id = o.id
         WHERE MONTH(o.created_at) = MONTH(CURDATE()) AND YEAR(o.created_at) = YEAR(CURDATE())
         GROUP BY mc.id, mc.name
         ORDER BY category_total DESC`
      );
      categorySales = categorySalesResult;
    } catch (err) {
      console.log("Category sales query failed:", err.message);
    }

    const stats = {
      totalOrdersThisMonth: ordersThisMonth,
      totalRevenueThisMonth: revenueThisMonth,
      totalCustomers: totalCustomers,
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
