const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
});

const Product = mongoose.model('Product', ProductScheme);

module.exports = Product;
