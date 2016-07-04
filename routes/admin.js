var express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  uploadProduct = multer({dest: 'resources/img/products/'});

  var cpUpload = uploadProduct.fields([{name: 'mainImage', maxCount : 1}, 
  {name: 'images', maxCount : 100 }]);
 

//Controller
var loginController = require('../controllers/admin/loginController');
var productController = require('../controllers/admin/productController');

//Routes
router.post('/login' , loginController.post);
router.get('/', loginController.get);  

//Produtos
router.get('/produtos', productController.get);
router.get('/produtos/novo', productController.getAdd);
router.get('/produto/:id', productController.getOne);
router.post('/produtos/novo', cpUpload, productController.post);
router.put('/produto/:id', cpUpload, productController.put);


module.exports = router;
