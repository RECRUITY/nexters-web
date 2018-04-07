/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('config');
const express = require('express');
const path = require('path');

/**
 * Controllers dependencies.
 */
const test = require('./controllers/test');
const products = require('./controllers/products');
const admin = require('./controllers/admin');

/**
 * Set environment
 */
process.env.TZ = 'Asia/Seoul';

/**
 * Connect to mongodb
 */
mongoose.connect(
  config.get('mongodb-url'),
  { promiseLibrary: global.Promise },
  (err) => {
    if (err) {
      console.log('Occurred the error when connecting mongodb: ', err);
    } else {
      console.log('The mongodb connection was successful.');
    }
  },
);


/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(cors({
  origin: true,
  credentials: true,
}));

/**
 * API 관련 라우팅 초기화.
 */
app.use('/api', (() => {
  const router = express.Router();

  router.use('/test', test);
  router.use('/products', products);

  return router;
})());

/**
 * Admin 관련 라우팅 초기화.
 */
app.use('/admin', admin);

/**
 * 일반 유저들이 볼 수 있는 라우팅 초기화.
 */
app.get('/', (req, res) => {
  res.render('web/index');
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(config.get('port'), () => {
  console.log('App is running at %d port', config.get('port'));
});
