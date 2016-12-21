var productDAO = require('../../models/data/mysql/productDAO');

categoryDAO= require('../../models/data/mysql/categoryDAO');
function ProductController () {


  this.get = function (req, res) {
    var categoryToFind = req.param('categoria');
    var isAmbiente = false;

    categoryDAO.findAll(function(err, cats) {

        if (categoryToFind) {
        categoryDAO.findByName(categoryToFind, function(err, cat) {
            if (cat) {

            productDAO.findProductByIdCategory(cat.IdCategory).then(
                function resolve (prods) {

                res.render('public/pages/products', {'ambiente' : isAmbiente, products : prods, categories : cats, queryCategory: categoryToFind});

                },
                function reject(err){
                res.render('public/pages/error', {error: err});
                });
            } else {
            productDAO.findAllProducts(function(err, prods) {
                res.render('public/pages/products', {'ambiente' : isAmbiente, products : prods, categories : cats, queryCategory: categoryToFind});
                });

            }
            });

        } else {
          productDAO.findAllProducts(function(err, prods) {
              res.render('public/pages/products', {'ambiente' : isAmbiente, products : prods, categories : cats, queryCategory: categoryToFind});
              });
        }
    });
  };

  this.getAmbientes = function (req, res) {
    var categoryToFind = req.param('categoria');
    isAmbiente = true;

    categoryDAO.findAll(function(err, cats) {
        if (categoryToFind) {
        categoryDAO.findByName(categoryToFind, function (err, cat) {
            if (err) return res.status(500).render(err);
            if (cat) {

            productDAO.findAmbientesByCategory(cat.IdCategory)
            .then(function resolve (ambientes) {
                return res.render('public/pages/products',
                    {'ambiente': isAmbiente, 'products' : ambientes, 'categories' : cats, 'queryCategory': categoryToFind});

                },
                function reject (err) {
                return res.status(500).render(err);
                });
            }

            });

        } else {
        productDAO.findAmbientes().then(
            function resolve(products) {

            return res.render('public/pages/products',
                {'ambiente' : isAmbiente, products : products, categories : cats, queryCategory: categoryToFind});
            },
            function reject(err) {
            res.render('public/pages/error', {error: err});
            });
        }
    });

  };

  this.getProduct = function (req, res) {
    productDAO.findOne(req.params.id, function (err, prod) {
        return res.render('public/pages/products/product', {'product' : prod});
        });

  };
}

module.exports = new ProductController();
