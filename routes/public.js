var express = require('express'),
  router = express.Router(),
  multer = require('multer');

var indexController = require('../controllers/public/indexController');
var productController = require('../controllers/public/productController');

router.get('/', indexController.get);
router.get('/produtos', productController.get);
router.get('/ambientes', productController.getAmbientes);
router.get('/produto/:id', productController.getProduct);

module.exports = router;
