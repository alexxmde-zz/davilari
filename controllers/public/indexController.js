var saleDAO = require("../../models/data/mysql/saleDAO");
var productDAO = require("../../models/data/mysql/productDAO");

function IndexController () {

  this.get = function (req, res) {
    saleDAO.findAll()
      .then(function resolve(sales) {
        productDAO.buscarDestaques(function (err, destaques) {

        res.render('public/pages/index', {"sales" : sales, "products" : destaques});
        });
      },
      function reject(err) {
        console.log(err);
        res.render('public/pages/error', {error : err});
      });
  };
}

module.exports = new IndexController();
