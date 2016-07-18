var saleDAO = require('../../models/data/mysql/saleDAO');

function SalesController() {

  this.get = function (req, res) {
    saleDAO.findAll()
      .then( 
        function(sales) {

        res.render('admin/pages/sale', {sales : sales});
      },
      function(err){
        return res.status(500).send(err);
      });
  };

  

  this.getForm = function (req, res) {
    res.render('admin/pages/sale/form', {sale : {}});
  };

  this.getOne = function (req, res) {
    saleDAO.findOne(req.param('id'))
      .then(
        function success (sale) {
          console.log(sale);
          return res.render('admin/pages/sale/form', {sale : sale});
        },
        function failure (err) {
          return res.status(500).send(err);
        }
      );
  };

  this.post = function (req, res) {
    var sale = req.body;
    sale.image = req.files.image[0].filename;

    saleDAO.insert(sale)
      .then(function() {
        res.status(200).send("OK");
      },
      function (err) {
        res.status(500).send(err);
      });

  };

  this.put = function (req, res) {
    var sale = req.body;

    if (req.files.image) {
      sale.image = req.files.image[0].filename;
    }
    IdSale = req.param('id');

    saleDAO.update(IdSale, sale)
      .then(
        function resolve () {
          return res.status(200).send("OK");
        },
        function reject (err) {
          return res.status(500).send(err);
        });

  };

}

module.exports = new SalesController();
