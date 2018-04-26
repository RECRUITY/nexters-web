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

/**
 * @api {post} /api/groups POST
 * @apiGroup Group
 * @apiName Create New Group
 * @apiDescription 새로운 Group을 추가한다.
 */
router.post('/', (req, res, next) => {
  (new Group({
    name: req.body.name,
  })).save((err, group) => {
    if (err) {
      return next(err);
    }
    return res.status(HttpStatus.OK).json({ group });
  });
});


module.exports = router;
