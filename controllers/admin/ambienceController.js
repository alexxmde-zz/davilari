let ambiencesModel = require('../../models/ambiences');

class AmbienceController {

  renderIndex(req, res) {
    let findAmbs =   ambiencesModel.find({}).exec();
    findAmbs.then((ambs) => {
      res.render('admin/pages/ambience', {'ambiences' : ambs});
    });

    findAmbs.catch(err=> {
      res.status(500).send(err);
    })
  }

  renderAmbience(req, res) {
    let findAmb = ambiencesModel.findById(req.params.id).exec();
    findAmb.then(amb => {
      res.render('admin/pages/ambience/form', {'ambience' : amb});
    });

    findAmb.catch(err => res.status(500).send(err));
  }

  renderForm (req, res) {
    res.render('admin/pages/ambience/form', {'ambience' : {} });
  }

  postAmbience (req, res) {
    let ambience = new ambiencesModel(req.body);

    ambience.mainImage = req.files['mainImage'][0].filename;
    ambience.images = [];
    if (req.files['images']) {
      req.files['images']
      .forEach(function ReturnImage (img) {
        ambience.images.push(img.filename);
      });
    }
    let save = ambience.save();
    save.then(() => res.send())
    save.catch(err => res.status(500).send(err));

  }

  updateAmbience (req, res) {
    let ambience = req.body;
    ambience.images = [];

    if (req.files['images']) {

      ambience.images = req.files['images'].map(function (obj) {
        return obj.filename;
      });
    }

    if (req.files['mainImage']) {
      ambience.mainImage = req.files['mainImage'][0].filename;
    }

    if(ambience.old_images) {
      ambience.old_images = JSON.parse(ambience.old_images);
      ambience.images = ambience.images.concat(ambience.old_images);
    }

    let update = ambiencesModel.findByIdAndUpdate(req.params.id, ambience);
    update.then(() => res.send());
    update.catch(err => res.status(500).send(err));

  }
}

module.exports = new AmbienceController();
