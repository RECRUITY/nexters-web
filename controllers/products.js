const express = require('express');
const gm = require('gm');
const stream = require('stream');
const multer = require('multer');
const HttpStatus = require('http-status-codes');

const Product = require('../models/Product');
const File = require('../models/File');

const fileUpload = require('../utils/fileUpload');

const router = express.Router();

/**
 * @api {get} /api/products GET
 * @apiGroup Product
 * @apiName get products
 * @apiDescription 존재하는 모든 products를 반환한다.
 */
router.get('/', (req, res, next) => {
  Product
    .find()
    .populate('file')
    .exec((err, products) => {
      if (err) {
        return next(err);
      }
      return res.status(HttpStatus.OK).json({ products });
    });
});

/**
 * @api {post} /api/products POST
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

/**
 * @api {put} /api/products/:id PUT
 * @apiGroup Product
 * @apiName Update Product
 * @apiDescription 해당 id의 프로덕트를 갱신한다.
 */
router.put('/:id', (req, res, next) => {
  const { title, description } = req.body;
  Product
    .findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true },
    )
    .populate('file')
    .exec((err, product) => {
      if (err) {
        return next(err);
      }
      return res.status(HttpStatus.OK).json({ product });
    });
});

/**
 * @api {delete} /api/products/:id DELETE
 * @apiGroup Product
 * @apiName Delete Product
 * @apiDescription 해당 id의 프로덕트를 삭제한다.
 */
router.delete('/:id', (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    return res.status(HttpStatus.OK).send();
  });
});

/**
 * @api {post} /api/products/:id/images
 * @apiGroup Product
 * @apiName Upload product image
 * @apiDescription 해당 id의 프로덕트 이미지를 올린다. form-data를 사용하며 필드 이름은 image 이어야 한다.
 */
router.post(
  '/:id/images',
  (() => {
    const upload = multer({ storage: multer.memoryStorage() });
    return upload.single('image');
  })(),
  (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        return next(err);
      }

      const { file } = req;

      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      const gmStream = (
        gm(bufferStream)
          .resize('150', '150', '^')
          .gravity('Center')
          .crop('150', '150')
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

            product.file = savedFile._id; // eslint-disable-line no-underscore-dangle
            product.save((productSaveError, savedProduct) => {
              if (productSaveError) {
                return next(productSaveError);
              }

              return res.status(HttpStatus.OK).json({ product: { ...savedProduct.toObject(), file: savedFile } });
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
