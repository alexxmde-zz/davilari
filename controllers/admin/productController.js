let productsModel = require('../../models/products');
let categoriesModel = require('../../models/categories');

class ProductController  {
  get (req, res) {
    let search = req.param('search'),
    query = search ? {'name': new RegExp(search, 'i')} : {},
    limit = 5,
    skip = req.param('page') || 0;

    let findProducts = productsModel.find(query).limit(limit).skip(skip * limit);

    findProducts.then(products => {
      productsModel.count(query, (err, count) => {
        res.render('admin/pages/product', {products:products, pageCount: count/limit, search: search, page:skip});
      });
    });

    findProducts.catch(err => res.status(500).send(err));
  };

  getAdd(req, res) {
    categoriesModel.find({}, (err, categories) => {
      res.render('admin/pages/product/form', {"product" : {}, "categories" : categories});
    });
  };

  post(req, res) {
    let product = new productsModel(req.body);
    product.mainImage = req.files['mainImage'][0].filename;

    if(req.files['images']) {
      product.images = req.files['images'].map(function (obj) {
        return obj.filename;
      }); //SANTO MAP
    }

    let save = product.save();

    save.then(() => res.send());
    save.catch(err => res.status(500).send(err));
  };

  put(req, res) {
    console.log("PUT");
    var product = req.body;
    product.images = [];
    //Get new images;
    if (req.files['images']) {

      product.images = req.files['images'].map(function (obj) {
        return obj.filename;
      });

    }
    //Append old images.
    product.old_images = JSON.parse(product.old_images);
    product.images = product.images.concat(product.old_images);

    //Get new Main Image
    if (req.files['mainImage']) {
      product.mainImage = req.files['mainImage'][0].filename;
    }
    //Destaque
    product.destaque = product.destaque ? true : false;

    let update = productsModel.findByIdAndUpdate(req.params.id, product);
    update.then(() => res.send());
    update.catch(err => res.status(500).send(err));

  };

  getOne (req, res) {
    productsModel.findById(req.params.id,(err, prod) => {
      if (err)
      return res.status(500).send(err);
      else {
        categoriesModel.find({},function(err, cats) {
          if(err) return res.status(500).send(err);
          debugger;
          res.render('admin/pages/product/form',
          {product : prod, categories : cats}
        );
      });
    }
  });
};

delete(req, res) {
  productsModel.remove({ _id : req.params.id}, (err) => {
    if (err)
    return res.status(500).send(err);
    else
    return res.send();
  });
}
}

module.exports = new ProductController();
