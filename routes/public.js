var express = require('express'),
  router = express.Router(),
  multer = require('multer');

var indexController = require('../controllers/public/indexController');

router.get('/', indexController.get);

module.exports = router;
