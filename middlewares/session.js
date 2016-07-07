function Session() {

  var verifySession = function (req) {
    if (req.session.isLogged) {
      return true;
    } else {
      return false;
    }
  };

  this.execute = function (req, res, next) {
    console.log(req.url);
    if(req.url == '/login') 
      return next();
    
    if (verifySession(req)) {
      next();
    }
    else {
      res.status(500).render('admin/pages/login');
    }
  };
}

var session = new Session();

module.exports = session.execute;
