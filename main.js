/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('config');
const express = require('express');
const path = require('path');

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

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(config.get('port'), () => {
  console.log('App is running at %d port', config.get('port'));
});
