var ambienceDAO = require('../../models/data/mysql/ambienceDAO.js');
let ambiencesModel = require('../../models/ambiences');

class ambienceController {

  getAllAmbiences (req, res) {
  let  findAmbs = ambiencesModel.find({}).exec();
   findAmbs.then(ambs => {
    res.render('public/pages/ambiences', {'ambiences' : ambs});
   })

   findAmbs.catch(err => res.send(error))
    
  };

  getAmbience (req, res) {
    let findAmb = ambiencesModel.findById(req.params.id).exec();
    findAmb.then(amb => res.render('public/pages/ambiences/ambience', {ambience:amb}));
    findAmb.catch(amb => res.status(500).send(err));
  }
}
module.exports = new ambienceController();
