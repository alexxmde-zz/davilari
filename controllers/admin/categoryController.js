var categoryModel = require('../../models/data/schema').Category;

function CategoryModel () {
   var renderPage = function (res, page, data) {

      res.render(page, data);

    };

//Render Categories
  this.get = function (req, res) {
   
  categoryModel.find(function(err, data) {
    if (err)
      return res.status(500).send(err);

    renderPage(res, 'admin/pages/category', {"categories" : data});
  });

  };
//Render Form
  this.getForm = function (req, res) {
    res.render('admin/pages/category/form', {category: {}});
  };

  //Render form with category
  this.getOne = function (req, res) {
    var _id = req.param('id');

    categoryModel.findOne({"_id" : _id}, function(err, data) {
      renderPage(res, 'admin/pages/category/form', {"category" : data});
    });
  };

  //Update category
  this.put = function (req, res) {
    var _id = req.param('id');

    categoryModel.update({"_id" : _id} , req.body, function (err, data) {
      console.log(req.body);
      if (err)
        return res.status(500).send(err);

      return res.status(200).send("OK");
    });
  };

  this.post = function (req, res) {
    categoryModel.create(req.body, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        console.log("Category inserted");
        return res.status(200).send("OK");
      }
    });
  };
}

module.exports = new CategoryModel();
