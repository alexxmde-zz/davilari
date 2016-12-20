var saleDAO = require('../../models/data/mysql/saleDAO');
let salesModel = require('../../models/sales');

function SalesController() {

  this.get = function (req, res) {
    salesModel.find({}, (err, sales) => {
        if (err) res.status(500).send(err);
        else res.render('admin/pages/sale', {sales : sales });
        })
  };



  this.getForm = function (req, res) {
    res.render('admin/pages/sale/form', {sale : {}});
  };

  this.getOne = function (req, res) {
    debugger;
    salesModel.findById(req.params.id, (err, sale) => {
    debugger;
        if (err) res.status(500).send(err);
        else res.render('admin/pages/sale/form', {sale: sale});
        })
  };

  this.post = function (req, res) {
    var sale = new salesModel(req.body);
    sale.image = req.files.image[0].filename;

    sale.save(err => {
        if (err) res.status(500).send(err)
        else res.send("OK");
        })
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
