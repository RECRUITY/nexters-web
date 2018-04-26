const express = require('express');
const HttpStatus = require('http-status-codes');

const Group = require('../models/Group');

const router = express.Router();

/**
 * @api {get} /api/groups GET
 * @apiGroup Group
 * @apiName get groups
 * @apiDescription 존재하는 모든 Group을 반환한다.
 */
router.get('/', (req, res, next) => {
  Group
    .find()
    .populate('file')
    .exec((err, groups) => {
      if (err) {
        return next(err);
      }
      return res.status(HttpStatus.OK).json({ groups });
    });
});

module.exports = router;
