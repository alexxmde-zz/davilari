function enterpriseController () {
  this.getIndex = function (req, res) {
    res.render("public/pages/enterprise");
  };
    
}

module.exports = new enterpriseController();
