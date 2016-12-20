const acabamentoModel = require('../../models/acabamento');
const tipoAcabamentoModel = require('../../models/tipoAcabamento');

class AcabamentoController {

  renderIndex(req, res) {
    acabamentoModel.find({})
    .populate('tipo')
    .exec((err, acabamentos) => {
      if (err)
        res.status(500).send(err);
      else
        res.render('admin/pages/acabamento', {'acabamentos' : acabamentos})
    });
  };

  addAcabamento(req, res) {
    let acabamento = new acabamentoModel(req.body);

    acabamento.imagem = req.files.imagem[0].filename;
    
    acabamento.save(err => {
        if (err)
          res.status(500).send(err);
        else
          res.send();
        })
  };

  renderForm(req, res) {
    tipoAcabamentoModel.find({}, (err, tipos) => {
      if (err)
        res.status(500).send(err);
      else
        res.render('admin/pages/acabamento/form', {'tipos' : tipos, 'acabamento' : {}});
    });
  }
   
  renderAcabamento(req, res) {
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
  }

  updateAcabamento(req, res) {
    //Parse request.
    let acabamento = req.body,
        id = req.params.id;

    //Append Image.
    if (req.files.imagem) {
      acabamento.imagem = req.files.imagem[0].filename;
    }
    //Update and send response.
    acabamentoModel.findByIdAndUpdate(id, acabamento,
      err => {
        if (err) res.status(500).send(err);
        else res.send();
      })
  }

}


module.exports = new AcabamentoController();
