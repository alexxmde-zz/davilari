var productModel = require('../../models/data/schema.js').Product;

function ProductController () {
  this.get = function (req, res) {
    function renderPage (err, products) {
      res.render('admin/pages/product', {"products" : products});
      
    }; 

    productModel.find(renderPage); 
  };

  this.getAdd = function(req, res) {
    res.render('admin/pages/product/form', {"product" : {}});
  };

  this.post = function (req, res) {
    var product = req.body;

    product.images = req.files['images'].map(function (obj) {
      return obj.filename;
    }); //SANTO MAP

    product.mainImage = req.files['mainImage'][0].filename;

    productModel.create(product, function (err, prod) {
      if (err) {
        res.status(500).send(err);
        return;
      } 

      res.status(200).send("OK");



    });

  };

  this.put = function (req, res) {
    var product = req.body;
    product.images = req.files['images'].map(function (obj) {
      return obj.filename;
    });

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
      res.render('admin/pages/product/form', {"product" : product});
      
    });
  };
}

module.exports = new ProductController();
