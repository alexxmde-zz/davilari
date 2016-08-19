var acabamentoDAO = require('../../models/data/mysql/acabamentoDAO');
var tipoAcabamentoDAO = require('../../models/data/mysql/tipoAcabamentoDAO');
function AcabamentoController () {

  this.renderIndex = function (req, res) {

    acabamentoDAO.buscarTodos(
      function resolve(acabamentos) {
        res.render("admin/pages/acabamento", {'acabamentos' : acabamentos});
      },
      function reject(err) {
        res.send(err);
      });
  };

  this.addAcabamento = function (req, res) {
    var acabamento = req.body;
    acabamento.imagem = req.files.imagem[0].filename;

    acabamentoDAO.addAcabamento(acabamento, 
      function resolve() {
        res.status(200).send("OK");
      },
      function reject(err) {
        res.status(500).send(err);
      });
  };

  this.renderForm = function (req, res) {
    tipoAcabamentoDAO.buscarTodos(
      function resolve(tipos) {
        res.render("admin/pages/acabamento/form", {'tipos' : tipos, 'acabamento' : {}});
      },
      function reject(err) {
        res.send(err);
      });
  };

  this.renderAcabamento = function (req, res) {
    tipoAcabamentoDAO.buscarTodos(
      function resolve(tipos) {

        acabamentoDAO.buscarAcabamento(req.params.id,
          function resolve(acabamento)
          {
            console.log(acabamento);
            res.render("admin/pages/acabamento/form", {'tipos' : tipos, 'acabamento' : acabamento});
          },
          function reject(err) {
            res.send(err);
          });
      },

      function reject(err) {
        res.send(err);
      });

  };

  this.updateAcabamento = function (req, res) {
    var acabamento = req.body;
     acabamento.IdAcabamento = req.params.id;

     if (req.files.imagem) {
       acabamento.imagem = req.files.imagem[0].filename;
     }
    

     acabamentoDAO.updateAcabamento(acabamento, 
       function resolve() {
         res.status(200).send("OK");
       },
       function reject(err) {
         res.status(500).send(err);
       });
  };

}


module.exports = new AcabamentoController();
