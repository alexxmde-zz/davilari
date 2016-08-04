function ContactController () {
  this.getIndex = function (req, res) {
    res.render("public/pages/contact");
  };

  this.postForm = function (req, res) {
    
  }
}

module.exports = new ContactController();
