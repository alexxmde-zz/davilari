var express = require('express'),
  router = express.Router(),
  multer = require('multer');

var indexController = require('../controllers/public/indexController');
var productController = require('../controllers/public/productController');
var cartController = require('../controllers/public/cartController');

router.get('/', indexController.get);
router.get('/produtos', productController.get);
router.get('/ambientes', productController.getAmbientes);
router.get('/produto/:id', productController.getProduct);

router.post('/cart', cartController.post);
router.get('/cart', cartController.get);


module.exports = router;
