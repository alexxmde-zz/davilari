var userSchema = require('../../models/data/schema').User;
console.log(userSchema);

function loginController () {
  this.get = function (req, res) {
    
    if(req.session.isLogged) {
      console.log("Is logged " + req.session.isLogged);
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
        res.render("admin/pages/product");

      } else {
        
        res.send("Usuario nao encontrado :" + user);
      }
    });
  };
  }


module.exports = new loginController();
