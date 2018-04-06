const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

const Product = mongoose.model('Product', ProductScheme);

module.exports = Product;
