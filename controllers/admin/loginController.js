let usersModel = require('../../models/users');
var productController = require("./productController");
function loginController () {

  var VerifyUser = function (user, req, res) {
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
    let findUsers = usersModel.find(req.body).exec();

    findUsers.then(user => {
        if(user) {
        req.session.isLogged = true;
        res.send();
        } else 
        res.status(404).send('Usuário não encontrado');
        })

    findUsers.catch(e => res.status(500).send(err));

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
