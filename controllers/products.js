const express = require('express');
const HttpStatus = require('http-status-codes');

const Product = require('../models/Product');

const router = express.Router();

/**
 * @api {get} /api/products Get
 * @apiGroup Product
 * @apiName get products
 * @apiDescription 존재하는 모든 products를 반환한다.
 */
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

/**
 * @api {post} /api/products Post
 * @apiGroup Product
 * @apiName Create New Product
 * @apiDescription 새로운 Product를 추가한다.
 */
router.post('/', (req, res, next) => {
  (new Product({
    title: req.body.title,
    description: req.body.description,
  })).save((err, product) => {
    if (err) {
      return next(err);
    }
    return res.status(HttpStatus.OK).json({ product });
  });
});

module.exports = router;
