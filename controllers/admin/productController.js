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

    //Um dia isso vai ser N categorias para 1 produto.
    product.categories = []; 
    product.categories.push(product.category);

    product.mainImage = req.files['mainImage'][0].filename;

    productDAO.insert(product, function (err) {
      if (err) {
        res.status(500).send(err);

      }  else {
        return res.status(200).send("OK");

      }

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

    product.IdProduct = req.params.id;

    product.categories = [];
    product.categories.push(product.category);

    productDAO.update(product, function (err, prod) {

      res.status(200).send("OK");

    }, function(err) {
      return res.status(500).send(err);
    });

  };

  this.getOne = function (req, res) {
    productDAO.findOne(req.params.id, function (err, prod) {
      if (err) return res.status(500).send(err);
      categoryDAO.findAll(function(err, cats) {
        if(err) return res.status(500).send(err);
        console.log(prod);
        res.render('admin/pages/product/form', 
          {product : prod, categories : cats}
        );
      });
    });
  };
}

module.exports = new ProductController();
