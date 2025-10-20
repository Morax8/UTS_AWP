const db = require("../config/db");

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    console.log("Fetching dashboard stats...");

    // 1. Statistik Utama - dengan error handling
    let ordersThisMonth = 0;
    let revenueThisMonth = 0;
    let totalCustomers = 0;

    try {
      const [ordersResult] = await db.query(
        `SELECT COUNT(id) as totalOrders FROM orders WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`
      );
      ordersThisMonth = ordersResult[0]?.totalOrders || 0;
    } catch (err) {
      console.log("Orders table not found or empty:", err.message);
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
      console.log("Users table not found or empty:", err.message);
    }

    // 2. Menu items count
    let totalMenuItems = 0;
    try {
      const [menuResult] = await db.query(`SELECT COUNT(id) as total FROM menu_items WHERE is_active = TRUE`);
      totalMenuItems = menuResult[0]?.total || 0;
    } catch (err) {
      console.log("Menu items query failed:", err.message);
    }

    const stats = {
      totalOrdersThisMonth: ordersThisMonth,
      totalRevenueThisMonth: revenueThisMonth,
      totalCustomers: totalCustomers,
      totalMenuItems: totalMenuItems,
      topMenus: [],
      dailySales: [],
      categorySales: [],
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
