const express = require('express');

const router = express.Router();

router.get('/nexters', (req, res) => {
  res.render('admin/nexters');
});

router.get('/recruit', (req, res) => {
  res.render('admin/recruit');
});

router.get('/products', (req, res) => {
  res.render('admin/products');
});

router.get('*', (req, res) => {
  res.redirect('/admin/nexters');
});

module.exports = router;
