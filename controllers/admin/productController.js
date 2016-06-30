var productModel = require('../../models/data/schema.js');

function ProductController () {
  this.get = function (req, res) {
    res.render('admin/pages/product');
  };
}

module.exports = new ProductController();
