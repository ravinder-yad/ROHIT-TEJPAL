import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Category from "../models/Category.js";
import Collection from "../models/Collection.js";

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Products
    const totalProducts = await Product.countDocuments();

    // 2. Total Orders
    const totalOrders = await Order.countDocuments();

    // 3. Sales Overview (Total Sales from 'delivered' or 'paid' orders)
    // Assuming 'delivered' means the sale is final, or 'paid' for prepaid. Let's aggregate totalAmount of orders that are not failed or cancelled.
    const salesAggregation = await Order.aggregate([
      {
        $match: {
          orderStatus: { $nin: ["cancelled"] },
          paymentStatus: { $nin: ["failed"] },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);
    const totalSales = salesAggregation.length > 0 ? salesAggregation[0].totalSales : 0;

    // 4. Low Stock Products (Stock between 1 and 5)
    const lowStockThreshold = 5;
    const lowStockCount = await Product.countDocuments({
      stock: { $gt: 0, $lte: lowStockThreshold },
    });
    const lowStockProducts = await Product.find({
      stock: { $gt: 0, $lte: lowStockThreshold },
    }).select("name stock status image").limit(5);

    // 5. Out of Stock Products (Stock === 0)
    const outOfStockCount = await Product.countDocuments({ stock: 0 });

    // 6. Order Status Breakdown
    const orderStatuses = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);
    
    // Format order statuses into an object with all statuses defaulted to 0
    const defaultStatuses = {
      pending: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };
    
    orderStatuses.forEach(status => {
      if (status._id) {
        defaultStatuses[status._id] = status.count;
      }
    });

    // 7. Recent Orders (Latest 5)
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("orderNumber customer.name totalAmount orderStatus createdAt");

    // 8. Recent Products (Latest 5)
    const recentProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name category status images.front");

    // 9. Categories Breakdown
    const categories = await Category.find({}).select("name slug");
    const categoryStats = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat.slug });
        return { name: cat.name, count };
      })
    );

    // 10. Collections Breakdown
    const collections = await Collection.find({}).select("title _id");
    const collectionStats = await Promise.all(
      collections.map(async (col) => {
        const count = await Product.countDocuments({ collection: col._id });
        return { name: col.title, count };
      })
    );

    // 11. Today's Sales
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todaysSalesAggregation = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday, $lte: endOfToday },
          orderStatus: { $nin: ["cancelled"] },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 },
          itemsSold: { $sum: { $sum: "$items.quantity" } }
        },
      },
    ]);

    const todaysStats = todaysSalesAggregation.length > 0 
      ? todaysSalesAggregation[0] 
      : { totalSales: 0, orderCount: 0, itemsSold: 0 };

    res.status(200).json({
      success: true,
      data: {
        mainStats: {
          totalProducts,
          totalOrders,
          totalSales,
          lowStockCount,
          outOfStockCount,
        },
        orderStatusOverview: defaultStatuses,
        categoryStats,
        collectionStats,
        lowStockProducts,
        recentOrders,
        recentProducts,
        todaysStats: {
          sales: todaysStats.totalSales,
          orders: todaysStats.orderCount,
          itemsSold: todaysStats.itemsSold || 0
        },
        alerts: {
          outOfStock: outOfStockCount,
          lowStock: lowStockCount,
          pendingOrders: defaultStatuses.pending,
        }
      },
    });
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch dashboard statistics",
      error: error.message,
    });
  }
};
