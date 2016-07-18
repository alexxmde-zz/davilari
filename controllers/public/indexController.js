var saleDAO = require("../../models/data/mysql/saleDAO");

function IndexController () {

  this.get = function (req, res) {
    saleDAO.findAll()
      .then(function resolve(sales) {
        res.render('public/pages/index', {"sales" : sales});
      },
      function reject(err) {
        res.render('public/pages/error', {error : err});
      });
  };
}

module.exports = new IndexController();
