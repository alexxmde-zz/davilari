var mysql = require('./connection');
var utils = require('../../../utils');

function AcabamentoDAO() {
  this.buscarTodos = function (resolve, reject) {
    var query = "SELECT a.* ,b.nome AS nomeTipo ";
    query += "FROM Tb_Acabamento AS a JOIN Tb_Tipo_Acabamento AS b ";
    query += "USING (IdTipoAcabamento) ORDER BY b.nome";

    mysql.query(query, function (err, rows) {
      if (err) {
        reject(err);
        console.log(query);
      }
      else {
        resolve(rows);
      }
    });

  };


  this.addAcabamento = function (acabamento, resolve, reject) {
    var query = "INSERT INTO Tb_Acabamento (nome, disponivel, imagem, idTipoAcabamento) ";
    query += "VALUES (?, ?, ?, ?) ";

    arrQuery = [acabamento.nome, utils.parseBin(acabamento.disponivel),
      acabamento.imagem, acabamento.IdTipoAcabamento];
    console.log(query);

    mysql.query(query, arrQuery, function (err) {
      if (err) {
        err.query = query;
        err.acabamento = arrQuery;
        reject (err);
      } else {
        resolve (err);
      }
    });
  };

  this.buscarAcabamento = function (idTipoAcabamento, resolve, reject) {
    var query = "SELECT * FROM Tb_Acabamento WHERE IdAcabamento = ?";

    mysql.query(query, idTipoAcabamento, function (err, rows) {
      if (err) {
        reject(err);
      }
      else {
        resolve(rows[0]);
      }
    });

  };

  this.updateAcabamento = function (a, resolve, reject) {
    var query = "";
    if (a.imagem) {
    query = "UPDATE Tb_Acabamento SET nome = ?, disponivel = ?, imagem = ?, idTipoAcabamento = ? ";
    query += "WHERE IdAcabamento = ?";

    var arr = [a.nome, utils.parseBin(a.disponivel), a.imagem, a.IdTipoAcabamento, a.IdAcabamento];
    } else {
      query = "UPDATE Tb_Acabamento SET nome = ?, disponivel = ?, idTipoAcabamento = ? ";
      query += "WHERE IdAcabamento = ?";

      var arr = [a.nome, utils.parseBin(a.disponivel), a.IdTipoAcabamento, a.IdAcabamento];

    }

    mysql.query(query, arr, function (err, rows) {
      if (err) {
        err.query = query;
        err.arr = arr;
        reject(err);
      }
      else {
        resolve();
      }
    });




  };


}
module.exports = new AcabamentoDAO();
