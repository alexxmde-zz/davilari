var userSchema = require('../../models/data/schema').User;

function loginController () {
  this.get = function (req, res) {
    
    if(req.session.isLogged) {
      res.render("admin/pages/product");
    } else {
    res.render("admin/pages/login");
    }

  };


  this.post = function (req, res) {
    userSchema.findOne({username: req.body.username} , function (err, user) {
      if (err) {
        console.error(err);
        return;
      }

      if (user) {
        req.session.isLogged = true;
        res.status(200).send("OK");

      } else {
        
        res.status(400).send("Usuario nao encontrado :" + user);
      }
    });
  };

  this.logout = function (req, res) {
    req.session.isLogged = false;
  };
  }




  module.exports = new loginController();
