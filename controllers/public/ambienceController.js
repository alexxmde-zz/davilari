var ambienceDAO = require('../../models/data/mysql/ambienceDAO.js');

function ambienceController() {

  this.getAllAmbiences = function (req, res) {
    ambienceDAO.getAllAmbiences(function resolve(ambiences) {
      res.render('public/pages/ambiences', {'ambiences' : ambiences});
    },
    function reject(error) {
      res.send(error);
    });

  };

  this.getAmbience = function (req, res) {
    ambienceDAO.getAmbience(req.params.id,
      function resolve(ambience) {
        res.render('public/pages/ambiences/ambience', {'ambience' : ambience});
      },
      function reject(error) {
        res.send(error);
      });
  };
}

module.exports = new ambienceController();
