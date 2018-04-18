const express = require('express');

const router = express.Router();

/**
 * @api {get} /api/files/:id GET
 * @apiGroup File
 * @apiName get file
 * @apiDescription 해당 id의 File을 반환한다.
 */
router.get('/:id', (req, res) => {
  const readstream = global.gfs.createReadStream({ _id: req.params.id });
  readstream.pipe(res);
});

module.exports = router;
