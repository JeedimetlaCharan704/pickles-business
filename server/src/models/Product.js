const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  description: String,
  spiceLevel: { type: Number, min: 1, max: 3 },
  weight: String,
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isVeg: { type: Boolean, required: true },
  inStock: { type: Boolean, default: true },
  images: [String],
  ingredients: String,
  nutrition: {
    calories: Number,
    protein: String,
    fat: String,
    carbs: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
