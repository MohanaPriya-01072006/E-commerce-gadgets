const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  brand:         { type: String, required: true, trim: true },
  category:      { type: String, required: true, trim: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number, default: null },
  rating:        { type: Number, default: 4.5 },
  reviews:       { type: Number, default: 0 },
  badge:         { type: String, enum: ['NEW', 'HOT', 'SALE', ''], default: '' },
  image:         { type: String, required: true },
  images:        [{ type: String }],
  description:   { type: String, required: true },
  specs:         [{ type: String }],
  colors:        [{ type: String }],
  inStock:       { type: Boolean, default: true },
  countInStock:  { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
