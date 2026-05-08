const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authMiddleware } = require('../middleware/auth');

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, total, address, paymentMethod } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      items,
      total,
      address,
      paymentMethod,
    });
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
