var productDAO = require('../../models/data/mysql/productDAO');

categoryDAO= require('../../models/data/mysql/categoryDAO');
function ProductController () {
  

  this.get = function (req, res) {
    console.log(req.param('categoria'));
    var categoryToFind = req.param('categoria');
    console.log("Finding products");

    debugger;
    categoryDAO.findAll(function(err, cats) {
      categoryDAO.findByName(categoryToFind, function(err, cat) {
        var query = {};
        if (cat[0]) {
          query = {'category':  cat[0]._id};
        }
        productDAO.findAll(function(err, prods) {

          res.render('public/pages/products', {products : prods, categories : cats, queryCategory: categoryToFind});
        });
      });
    });
  };
}

module.exports = new ProductController();
