var acabamentoDAO = require('../../models/data/mysql/acabamentoDAO');

function acabamentoController() {
  this.buscarTodos = function (req, res) {
    acabamentoDAO.buscarAcabamentosOrganizadosPorTipo(function resolve(tiposDeAcabamento) {
      res.render('public/pages/acabamentos', {"tiposDeAcabamento" : tiposDeAcabamento});
    },
    function reject(error){
      res.send(error);
    });
  };
}

module.exports = new acabamentoController();
