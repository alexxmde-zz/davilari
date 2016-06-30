
var express = require('express'),
    router = express.Router();

//Controller
var loginController = require('../controllers/admin/loginController');
var productController = require('../controllers/admin/productController');

//Routes
router.get('/', loginController.get);  
router.get('/produtos', productController.get);
router.post('/login' , loginController.post);
  

module.exports = router;
