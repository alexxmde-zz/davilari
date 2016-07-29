var userDAO = require('../../models/data/mysql/userDAO');
var productController = require("./productController");
function loginController () {

  var VerifyUser = function (err, user, req, res) {
    if(err) {
      console.error(err);
      return res.status(500).send(err);
    }
    if (user) {
      req.session.isLogged = true;
      return res.status(200).send("OK");

    } else {

      console.log("User not found");
      return res.status(400).send("Usuario nao encontrado :" + user);

    }


  };

  this.get = function (req, res) {

    if (req.session.isLogged) {
      productController.get(req, res);

    } else {
      res.render("admin/pages/login");
    }

  };

  this.post = function (req, res) {
    var user = req.body;
    userDAO.FindByNameAndPassword(user.username, user.password, function(err, user) {
      VerifyUser(err, user, req, res);
    });
  };


  /*
     userSchema.findOne({username: req.body.username} , function (err, user) {
     if (err) {
     console.error(err);
     return;
     }

     });
     };
     */

  this.logout = function (req, res) {
    req.session.isLogged = false;
  };
}




module.exports = new loginController();
