var productDAO = require('../../models/data/mysql/productDAO');

categoryDAO= require('../../models/data/mysql/categoryDAO');
function ProductController () {


  this.get = function (req, res) {
    var categoryToFind = req.param('categoria');
    var isAmbiente = false;

    console.log("\n\nFinding all categories");
    categoryDAO.findAll(function(err, cats) {

      if (categoryToFind) {
        console.log("Querying category with " +categoryToFind);
        categoryDAO.findByName(categoryToFind, function(err, cat) {
          if (cat) {
            console.log("Found category " + cat.IdCategory);
            console.log("Querying for products with the IdCategory " + cat.IdCategory);

            productDAO.findProductByIdCategory(cat.IdCategory).then(
              function resolve (prods) {
                console.log("Showing " +  prods.length + " products");

            res.render('public/pages/products', {'ambiente' : isAmbiente, products : prods, categories : cats, queryCategory: categoryToFind});

          },
          function reject(err){
            res.render('public/pages/error', {error: err});
          });
          } else {
            console.log("Category " + categoryToFind + "not found");
            console.log("Querying for all products");
            productDAO.findAllProducts(function(err, prods) {
              console.log("Found " + prods.length + "products");
              res.render('public/pages/products', {'ambiente' : isAmbiente, products : prods, categories : cats, queryCategory: categoryToFind});
            });

          }
        });

      } else {
        console.log("Querying for all products");
        productDAO.findAllProducts(function(err, prods) {
          res.render('public/pages/products', {'ambiente' : isAmbiente, products : prods, categories : cats, queryCategory: categoryToFind});
        });
      }
    });
  };

  this.getAmbientes = function (req, res) {
    var categoryToFind = req.param('categoria');
    isAmbiente = true;

    console.log("\n\nQuerying for all categories");
    console.log("\n\nQuerying for all categories");
    categoryDAO.findAll(function(err, cats) {
      if (categoryToFind) {
        console.log("Querying for category " + categoryToFind);
        categoryDAO.findByName(categoryToFind, function (err, cat) {
          if (err) return res.status(500).render(err);
          if (cat) {
            console.log("Found category " + categoryToFind);
            console.log("Querying for ambients with the IdCategory = " + cat.IdCategory);

          productDAO.findAmbientesByCategory(cat.IdCategory)
            .then(function resolve (ambientes) {
              console.log("Found " + ambientes.length + " products");
              return res.render('public/pages/products',
                {'ambiente': isAmbiente, 'products' : ambientes, 'categories' : cats, 'queryCategory': categoryToFind});

            },
            function reject (err) {
              return res.status(500).render(err);
            });
          }

               });

      } else {
        console.log("Querying for all ambients");
        productDAO.findAmbientes().then(
          function resolve(products) {

            console.log(products);
            console.log("Rendering");
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
