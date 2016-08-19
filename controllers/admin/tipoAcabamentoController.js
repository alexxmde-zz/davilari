var tipoAcabamentoDAO = require('../../models/data/mysql/tipoAcabamentoDAO.js');
function TipoAcabamentoController () {

  this.renderIndex = function (req, res) {
    tipoAcabamentoDAO.buscarTodos(
      function resolve (tipos) {
        console.log("Tipos: " + tipos);
        res.render('admin/pages/tipo_acabamento', {tipos : tipos});
    },

    function reject (error) {
    res.send("Erro: " + error);
    });

  };

  this.renderForm = function (req, res) {
    res.render("/admin/pages/tipo_acabamento/form", {"tipoAcabamento" : {}});

  };

  this.renderTipoAcabamento = function (req, res) {
    res.render("admin/pages/tipo_acabamento/form", {"tipoAcabamento" : {}});

  };

  this.addTipoAcabamento = function (req, res) {
    var tipoAcabamento = req.body.tipoAcabamento;

    if (tipoAcabamento) {
      tipoAcabamentoDAO.add(tipoAcabamento, 

        function resolve() {
          res.status(200).send("OK");
        },
        
        function reject(error){
          res.status(500).send(error);

        });

    } else {
      return res.status(500).send("Tipo de acabamento não consta na requisição");


    }
  };

  this.updateTipoAcabamento = function (req, res) {
    var idTipoAcabamento = req.params.id;
    var tipoAcabamento = req.body.tipoAcabamento;

    if (tipoAcabamento) {
      tipoAcabamentoDAO.update(
        idTipoAcabamento, tipoAcabamento,
        function resolve (resolve) {
          res.status(200).send("OK");
        },
        function reject (error) {
          res.status(500).send(error);
        });

    } else {
      res.status(500).send("Tipo de acabamento não encontrado na requisição");
    }
  };


}

module.exports = new TipoAcabamentoController();
