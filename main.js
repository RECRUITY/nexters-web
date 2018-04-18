/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
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
const files = require('./controllers/files');

/**
 * Set environment
 */
process.env.TZ = 'Asia/Seoul';

/**
 * Seg gridfs settings for file upload
 */
const conn = mongoose.connection;
conn.once('open', () => {
  console.log('open mongoose');
  global.gfs = gridfs(conn.db, mongoose.mongo);
});

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
const app = express({
  origin: true,
  credentials: true,
});

/**
 * Express configuration.
 */
app.use(compression());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
  parameterLimit: 100000,
}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/admin', express.static(path.resolve(__dirname, 'views', 'admin', 'dist')));
app.set('view engine', 'pug');
app.use(cors());

/**
 * API 관련 라우팅 초기화.
 */
app.use('/api', (() => {
  const router = express.Router();

  router.use('/test', test);
  router.use('/products', products);
  router.use('/files', files);

  return router;
})());

/**
 * Admin 관련 라우팅 초기화.
 */
app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'admin', 'index.html'));
});

/**
 * 일반 유저들이 볼 수 있는 라우팅 초기화.
 */
app.get('/', (req, res) => {
  res.render('web/index');
});

/**
 * 매칭되는 라우팅이 없으면 root로 리다이렉트
 */
app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(config.get('port'), () => {
  console.log('App is running at %d port', config.get('port'));
});
