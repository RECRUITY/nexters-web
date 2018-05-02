const express = require('express');
const multer = require('multer');
const stream = require('stream');
const gm = require('gm');
const HttpStatus = require('http-status-codes');

const Group = require('../models/Group');
const File = require('../models/File');

const fileUpload = require('../utils/fileUpload');

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

/**
 * @api {get} /api/groups GET
 * @apiGroup Group
 * @apiName get groups
 * @apiDescription 존재하는 모든 Group을 반환한다.
 */
router.get('/nexters', (req, res, next) => {
  Group
    .findOne({ name: 'nexters' })
    .populate('file')
    .exec((err, group) => {
      if (err) {
        return next(err);
      }
      return res.status(HttpStatus.OK).json({ group });
    });
});

/**
 * @api {post} /api/groups/:id/images
 * @apiGroup Group
 * @apiName Upload group image
 * @apiDescription 해당 id의 그룹에 이미지를 올린다. form-data를 사용하며 필드 이름은 image 이어야 한다.
 */
router.post(
  '/:id/images',
  (() => {
    const upload = multer({ storage: multer.memoryStorage() });
    return upload.single('image');
  })(),
  (req, res, next) => {
    Group.findById(req.params.id, (err, group) => {
      if (err) {
        return next(err);
      }

      const { file } = req;

      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      const gmStream = (
        gm(bufferStream)
          .resize('400', '200', '^')
          .gravity('Center')
          .crop('400', '200')
          .stream()
      );

      const uploadBufferStream = fileUpload(file.originalname, bufferStream);
      const uploadGmStream = fileUpload(file.originalname, gmStream);

      Promise.all([uploadBufferStream, uploadGmStream])
        .then(([origin, thumb]) => {
          const newFile = new File({
            name: origin.filename,
            fileId: origin._id, // eslint-disable-line no-underscore-dangle
            image: true,
            thumb: {
              fileId: thumb._id, // eslint-disable-line no-underscore-dangle
            },
          });
          newFile.save((fileSaveError, savedFile) => {
            if (fileSaveError) {
              return next(fileSaveError);
            }

            group.file = savedFile._id; // eslint-disable-line no-underscore-dangle
            group.save((groupSaveError, savedGroup) => {
              if (groupSaveError) {
                return next(groupSaveError);
              }

              return res.status(HttpStatus.OK).json({
                group: {
                  ...savedGroup.toObject(),
                  file: savedFile,
                },
              });
            });

            return null;
          });
        })
        .catch(promiseError => next(promiseError));

      return null;
    });
  },
);

module.exports = router;
