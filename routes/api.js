var express = require('express'),
  router = express.Router();

var productController = require('../controllers/admin/productController'),
    categoryController = require('../controllers/admin/categoryController');

router.get('/products', productController.api.get );
router.get('/categories', categoryController.api.get);

module.exports = router;
