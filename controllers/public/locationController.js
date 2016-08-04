function LocationController () {
  this.getIndex = function (req, res) {
    res.render("public/pages/location");
  };
}

module.exports = new LocationController();
