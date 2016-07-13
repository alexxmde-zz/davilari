var productModel = require('../../models/data/schema').Product;

categoryModel = require('../../models/data/schema').Category;
function ProductController () {
  

  this.get = function (req, res) {
    console.log(req.param('categoria'));
    var categoryToFind = req.param('categoria');

    categoryModel.find(function(err, cats) {
      categoryModel.find({name : categoryToFind}, function(err, cat) {
        var query = {};
        console.log(cat[0]);
        if (cat[0]) {
          query = {'category':  cat[0]._id};
        }
        console.log(query);
        productModel.find(query, function(err, prods) {

          res.render('public/pages/products', {products : prods, categories : cats, queryCategory: categoryToFind});
        });
      });
    });
  };
}

module.exports = new ProductController();
