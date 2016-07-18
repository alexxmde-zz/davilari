var express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  uploadSale = multer({dest: 'resources/img/sales'}),
  uploadProduct = multer({dest: 'resources/img/products/'});

  var cpUpload = uploadProduct.fields([{name: 'mainImage', maxCount : 1}, 
  {name: 'images', maxCount : 100 }]);

  var csUpload = uploadSale.fields([{name: 'image', maxCount : 1}]);
 

//Controller
var loginController = require('../controllers/admin/loginController');
var productController = require('../controllers/admin/productController');
var categoryController = require('../controllers/admin/categoryController');
var saleController = require('../controllers/admin/saleController');

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

//Promocoes
router.get('/promocoes', saleController.get);
router.get('/promocao', saleController.getForm);
router.get('/promocao/:id', saleController.getOne);
router.post('/promocao', csUpload, saleController.post);
router.put('/promocao/:id', csUpload, saleController.put);





module.exports = router;
