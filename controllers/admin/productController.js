var productDAO = require('../../models/data/mysql/productDAO');
var categoryDAO= require('../../models/data/mysql/categoryDAO.js');

function ProductController () {
  this.api = {};
  this.api.get = function (req, res) {
    productModel.find(function(err, products) {
      res.status(200).json(products);
    });
  };

  this.get = function (req, res) {
    var _products = [];

    if (req.param('search')) {
 productDAO.findByName(req.param('search'), function(err, products) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        res.render("admin/pages/product", {products : products});
      });

    } else {

      productDAO.findAll(function(err, products) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }

        res.render("admin/pages/product", {products : products});
      });

    }
    /*
       function renderPage (err, products) {
       res.render('admin/pages/product', {"products" : products});

       }; 

       var query = {};

       if (req.param('search')) {
       query = { 'name' : new RegExp('' + req.param('search') + '', "i") };

       }

       console.log(query);

       productModel.find(query, renderPage); 
       */
  };

  this.getAdd = function(req, res) {
    categoryDAO.findAll(function(err, categories) { 

      res.render('admin/pages/product/form', {"product" : {}, "categories" : categories});
    });
  };

  this.post = function (req, res) {
    var product = req.body;

    product.images = req.files['images'].map(function (obj) {
      return obj.filename;
    }); //SANTO MAP

    product.mainImage = req.files['mainImage'][0].filename;

    productDAO.insert(product, function (err, prod) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      } 

      res.status(200).send("OK");

    });

  };

  this.put = function (req, res) {
    var product = req.body;
    product.images = [];

    if (req.files['images']) {

      product.images = req.files['images'].map(function (obj) {
        return obj.filename;
      });

    }

    if (req.files['mainImage']) {
      product.mainImage = req.files['mainImage'][0].filename;
    }

    product.old_images = JSON.parse(product.old_images);
    product.images = product.images.concat(product.old_images);

    productModel.update({"_id" : req.params.id}, product, function (err, prod) {
      if (err) 
        return console.error(err);

      res.status(200).send("OK");

    });

  };

  this.getOne = function (req, res) {
    productModel.findOne({"_id" : req.params.id}, function (err, product) {
      console.log(product);
      categoryModel.find(function(err, categories) {
        res.render('admin/pages/product/form',
          { "product" : product,
            "categories" : categories
          }
        );
      });

    });
  };
}

module.exports = new ProductController();
