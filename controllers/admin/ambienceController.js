var ambienceDAO = require('../../models/data/mysql/ambienceDAO.js');

function AmbienceController() {
  this.renderIndex = function (req, res) {
    ambienceDAO.getAllAmbiences(
      function resolve (ambiences) {
        res.render('admin/pages/ambience/', { 'ambiences' : ambiences });
      }, 
      function reject(error) {
        res.send(error);
      });

  };

  this.renderAmbience = function (req, res) {
    ambienceDAO.getAmbience( req.params.id, 
      function resolve (ambience) {
        res.render('admin/pages/ambience/form', {'ambience' : ambience} );
      },
      function reject (error) {
        res.json(error);
      });
  };

  this.renderForm = function (req, res) {
    res.render('admin/pages/ambience/form', {'ambience' : {} });
  };

  this.postAmbience = function (req, res) {
    var ambience = req.body;

    ambience.mainImage = req.files['mainImage'][0].filename;
    ambience.images = [];
    req.files['images']
      .forEach(function ReturnImage (img) {
        ambience.images.push(img.filename);
    });

    ambienceDAO.addAmbience(ambience,
      function Resolve () {
        res.status(200).send("OK");
      },
      function Reject (error) {
        res.status(500).send(error);
      }
    );


   
  };

  this.updateAmbience = function (req, res) {
    var ambience = req.body;
        ambience.images = [];

    if (req.files['images']) {

      ambience.images = req.files['images'].map(function (obj) {
        return obj.filename;
      });

    }

    if (req.files['mainImage']) {
      ambience.mainImage = req.files['mainImage'][0].filename;
    }

    ambience.old_images = JSON.parse(ambience.old_images);
    ambience.images = ambience.images.concat(ambience.old_images);

    ambience.IdAmbience = req.params.id;


    ambienceDAO.updateAmbience(ambience, function (err) {

      res.status(200).send("OK");

    }, function(err) {
      return res.status(500).send(err);
    });

  };
}

module.exports = new AmbienceController();
