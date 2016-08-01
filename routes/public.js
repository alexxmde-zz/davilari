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

router.post('/cart/item', cartController.postItem);
router.post('/cart', cartController.postCart);
router.delete('/cart/item/:id', cartController.deleteItem);
router.get('/cart', cartController.getCart);


module.exports = router;
