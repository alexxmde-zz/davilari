function IndexController () {

  this.get = function (req, res) {
    res.render('public/pages/index');
  };
}

module.exports = new IndexController();
