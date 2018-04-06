const express = require('express');
const HttpStatus = require('http-status-codes');

const Product = require('../models/Product');

const router = express.Router();

router.get('/', (req, res, next) => {
  Product
    .find()
    .exec((err, products) => {
      if (err) {
        return next(err);
      }
      return res.status(HttpStatus.OK).json({ products });
    });
});

module.exports = router;
