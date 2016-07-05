var express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  uploadProduct = multer({dest: 'resources/img/products/'});

  var cpUpload = uploadProduct.fields([{name: 'mainImage', maxCount : 1}, 
  {name: 'images', maxCount : 100 }]);
 

//Controller
var loginController = require('../controllers/admin/loginController');
var productController = require('../controllers/admin/productController');
var categoryController = require('../controllers/admin/categoryController');

//Routes
router.post('/login' , loginController.post);
router.get('/', loginController.get);  

//Produtos
router.get('/produtos', productController.get);
router.get('/produtos/novo', productController.getAdd);
router.get('/produto/:id', productController.getOne);
router.post('/produtos/novo', cpUpload, productController.post);
router.put('/produto/:id', cpUpload, productController.put);

//Categorias 
router.get('/categorias', categoryController.get);
router.get('/categoria', categoryController.getForm);
router.get('/categoria/:id', categoryController.getOne);
router.post('/categoria', cpUpload, categoryController.post);
router.put('/categoria/:id', cpUpload, categoryController.put);




module.exports = router;
