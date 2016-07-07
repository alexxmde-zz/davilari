var express = require('express'),
  router = express.Router();

var productController = require('../controllers/admin/productController');

router.get('/products', productController.api.get );

module.exports = router;
