let categoriesModel = require('../../models/categories');
class CategoryModel {

  //Render Categories
  get (req, res) {
    categoriesModel.find({}, (err, categories) => {
        if (err)
        res.status(500).send(err);
        else
        res.render('admin/pages/category', {categories : categories});
        })
  };
  //Render Form
  getForm (req, res) {
    res.render('admin/pages/category/form', {category: {}});
  }

  //Render form with category
  getOne (req, res) {
    categoriesModel.findById(req.params.id, (err, category) => {
        if (err)
        res.status(500).send(err);
        else
        res.render('admin/pages/category/form', {category : category});
        });
  }

  //Update category
  put (req, res) {
    let id = req.params.id;
    categoriesModel.findByIdAndUpdate(id, req.body, err => {
      if (err)
        res.status(500).send(err);
      else
        res.send();
    });
  }

  post (req, res) {
    let category = new categoriesModel(req.body),
        save = category.save();

    save.then(() => {
      res.send("OK");
    })

    save.catch((err) => {
      res.status(500).send(err);
    })
  }
}

module.exports = new CategoryModel();
