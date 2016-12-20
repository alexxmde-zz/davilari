const acabamentoModel = require('../../models/acabamento');
const tipoAcabamentoModel = require('../../models/tipoAcabamento');

function AcabamentoController () {

  this.renderIndex = function (req, res) {
    acabamentoModel.find({})
    .populate('tipo')
    .exec((err, acabamentos) => {
      if (err)
        res.status(500).send(err);
      else
        res.render('admin/pages/acabamento', {'acabamentos' : acabamentos})
    });
  };

  this.addAcabamento = function (req, res) {
    let acabamento = new acabamentoModel(req.body);
    acabamento.tipo = req.body.IdTipoAcabamento;

    acabamento.imagem = req.files.imagem[0].filename;
    acabamento.save(err => {
        if (err)
          res.status(500).send(err);
        else
          res.send();
        })
  };

  this.renderForm = function (req, res) {
    tipoAcabamentoModel.find({}, (err, tipos) => {
      if (err)
        res.status(500).send(err);
      else
        res.render('admin/pages/acabamento/form', {'tipos' : tipos, 'acabamento' : {}});
    });
  }
   
  this.renderAcabamento = function (req, res) {
    tipoAcabamentoModel.find({}, (err, tipos) => {
      if (err)
       return res.status(500).send(err);
      else {
        acabamentoModel.findById(req.params.id, (err, acabamento) => {
          if (err)
            return res.status(500).send(err)
          else
            res.render('admin/pages/acabamento/form', {'tipos' :tipos, 'acabamento' :acabamento});
        })
      }
    })
  };

  this.updateAcabamento = function (req, res) {
    let acabamento = req.body;
    acabamento.IdAcabamento = req.params.id;
    acabamento.tipo = acabamento.IdTipoAcabamento;

    if (req.files.imagem) {
      acabamento.imagem = req.files.imagem[0].filename;
    }

    acabamentoModel.findByIdAndUpdate(req.params.id, acabamento,
      err => {
        if (err) res.status(500).send(err);
        else res.send();
      })
  };

}


module.exports = new AcabamentoController();
