let acabamentoModel = require('../../models/acabamento'),
    tipoAcabamentoModel = require('../../models/tipoAcabamento');

class acabamentoController {
  buscarTodos(req, res) {
    tipoAcabamentoModel.find((err, tipos) => {
      if (err) 
        res.status(500).send(err);
      else {
        //Create promise array.
        let actions = tipos.map(t => acabamentoModel.find({'tipo' : t._id}).then(a => t.acabamentos = a));
        let results = Promise.all(actions);

        //When all resolved.
        results.then(() => {
          res.render('public/pages/acabamentos', {'tiposDeAcabamento': tipos});
        });
        
        results.catch((err) => {
          res.status(500).send(err)
        });
      }
    })
  }
}

module.exports = new acabamentoController();
