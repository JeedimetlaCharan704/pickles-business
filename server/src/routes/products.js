const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, spiceLevel, minPrice, maxPrice, sort } = req.query;
    let query = {};

    if (category && category !== 'all') query.category = category;
    if (spiceLevel) query.spiceLevel = parseInt(spiceLevel);
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-low') sortOption.price = 1;
    if (sort === 'price-high') sortOption.price = -1;
    if (sort === 'rating') sortOption.rating = -1;

    const products = await Product.find(query).sort(sortOption);
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
