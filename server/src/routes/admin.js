const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// Apply auth and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const stats = {
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders: await Order.countDocuments(),
      totalUsers: await User.countDocuments(),
      totalProducts: await Product.countDocuments(),
      recentOrders: await Order.find().sort({ createdAt: -1 }).limit(5),
      topProducts: await Product.find().sort({ reviews: -1 }).limit(5),
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update order status
router.patch('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
