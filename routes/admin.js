var express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  uploadSale = multer({dest: 'resources/img/sales'}),
  uploadProduct = multer({dest: 'resources/img/products/'}),
  uploadAmbience = multer({dest: 'resources/img/ambiences'}),
  uploadAcabamento = multer({dest: 'resources/img/acabamentos'});

  var cpUpload = uploadProduct.fields([{name: 'mainImage', maxCount : 1}, 
  {name: 'images', maxCount : 100 }]);

  var csUpload = uploadSale.fields([{name: 'image', maxCount : 1}]);

  var caUpload = uploadAmbience.fields([{name: 'mainImage', maxCount : 1},
    {name: 'images', maxCount : 100}]);

  var acUpload = uploadAcabamento.fields([{name: 'imagem', maxCount : 1}]);
 

//Controller
var loginController = require('../controllers/admin/loginController');
var productController = require('../controllers/admin/productController');
var categoryController = require('../controllers/admin/categoryController');
var saleController = require('../controllers/admin/saleController');

var ambienceController = require('../controllers/admin/ambienceController');
var acabamentoController = require('../controllers/admin/acabamentoController');
var tipoAcabamentoController = require('../controllers/admin/tipoAcabamentoController');

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

//Ambientes
router.get('/ambientes', ambienceController.renderIndex);
router.get('/ambiente/:id', ambienceController.renderAmbience);
router.get('/ambiente', ambienceController.renderForm);
router.post('/ambiente', caUpload, ambienceController.postAmbience);
router.put('/ambiente/:id', caUpload, ambienceController.updateAmbience);

//Acabamentos
router.get('/acabamentos', acabamentoController.renderIndex);
router.get('/acabamento', acabamentoController.renderForm);
router.get('/acabamento/:id', acabamentoController.renderAcabamento);
router.post('/acabamento', acUpload, acabamentoController.addAcabamento);
router.put('/acabamento/:id', acUpload, acabamentoController.updateAcabamento);

//Tipos de Acabamentos
router.get('/tipos_acabamento', tipoAcabamentoController.renderIndex);
router.get('/tipo_acabamento/:id', tipoAcabamentoController.renderTipoAcabamento);
router.post('/tipo_acabamento', tipoAcabamentoController.addTipoAcabamento);
router.put('/tipo_acabamento/:id', tipoAcabamentoController.updateTipoAcabamento);








module.exports = router;
