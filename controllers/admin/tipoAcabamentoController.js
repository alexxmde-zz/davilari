const tipoAcabamentoModel = require('../../models/tipoAcabamento');

class TipoAcabamentoController {

  renderIndex(req, res) {
    tipoAcabamentoModel.find({}, (err, tipos) => {
    debugger;
      if (err)
        res.status(500).send(err);
      else
        res.render('admin/pages/tipo_acabamento', {tipos : tipos});
    })
  };

  renderForm(req, res) {
    res.render("/admin/pages/tipo_acabamento/form", {"tipoAcabamento" : {}});
  };

  renderTipoAcabamento(req, res) {
    res.render("admin/pages/tipo_acabamento/form", {"tipoAcabamento" : {}});
  };

  addTipoAcabamento(req, res) {
  debugger;
    let tipoAcabamento = new tipoAcabamentoModel({nome: req.body.tipoAcabamento});
    tipoAcabamento.save(err => {
      if (err) 
        res.status(500).send(err);
      else
        res.send();
    })
  };

  updateTipoAcabamento(req, res) {
    let idTipoAcabamento = req.params.id;
    let tipoAcabamento = req.body.tipoAcabamento;
    tipoAcabamentoModel.findByIdAndUpdate(idTipoAcabamento, {'nome' : tipoAcabamento},
      err => {
        if (err) 
          res.status(500).send(err);
        else
          res.send();
      })
  };
}

module.exports = new TipoAcabamentoController();
