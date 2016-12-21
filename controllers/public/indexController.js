let productsModel = require('../../models/products');
let salesModel = require('../../models/sales');

class IndexController {
  get(req, res) {
    let proms = [];
    //Populate promises array.
    proms.push( salesModel.find({}).exec());
    proms.push(productsModel.find({'destaque' : true}).exec());

    let results = Promise.all(proms);

    //When ALL complete.
    results.then(results => {
        res.render('public/pages/index', {"sales" : results[0], "products" : results[1]});
        });
  }
}

module.exports = new IndexController();
