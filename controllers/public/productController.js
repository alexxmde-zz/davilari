let productsModel = require('../../models/products');
let categoriesModel = require('../../models/categories');
class ProductController  {

  get(req, res) {
    let query = req.param('categoria')
      ? {'name' : req.param('categoria') } 
    : {},
    limit = 0,
    skip = req.param('skip') || 0;

      categoriesModel.findOne(query).then(c => {

      let categories = categoriesModel.find({}).exec(),
      products = productsModel.find({category : c._id}).limit(limit).skip(skip*10).populate({path:'category', match: query}).where(),
      results = Promise.all([categories, products]);

    results.then(arr => {
        let categories = arr[0],
        products = arr[1],
        queryCategory = req.param('categoria'),
        pCount = products.length,
        ambiente = false;
        

        res.render('public/pages/products', {ambiente, products, categories, queryCategory, pCount})
        });
        })
     }
 
  getProduct(req, res) {
    let findProd = productsModel.findById(req.params.id).exec();
    findProd.then(prod => res.render('public/pages/products/product', {'product':prod}));
    findProd.catch(err => res.status(500).send(err));
  }
}

module.exports = new ProductController();
