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

  this.buscarAcabamentosOrganizadosPorTipo = function (resolve, reject) {
    var goOn = true,
      error = null;
    arrTiposDeAcabamento = [],
    query = "SELECT IdTipoAcabamento, nome FROM Tb_Tipo_Acabamento";

  mysql.query(query, function (err, rows) {
    if (err) {
      goOn = false;
      error = err;
      return reject (err);
    }
    else {

      var loopCount = rows.length;
      var done = false;
      var tipoDeAcabamento;

      for (var i = 0; i < rows.length; i++) {

        if (goOn) {

          query = "SELECT * FROM Tb_Acabamento WHERE IdTipoAcabamento = " + rows[i].IdTipoAcabamento;
          tipoDeAcabamento = {
            'tipoAcabamento' : rows[i].nome,
            'count' : i
          };
          console.log(tipoDeAcabamento.count + "\n\n");

          (function(tipoDeAcabamento) {
          mysql.query(query, function (err, erows) {
            if (err) {
              goOn = false;
              error = err;
              return reject (err);
            } else {
              tipoDeAcabamento.acabamentos = erows;
              arrTiposDeAcabamento.push(tipoDeAcabamento);
              loopCount = loopCount -1;


              if (loopCount == 0) {
                resolve(arrTiposDeAcabamento);
              }
            }
          });
          }(tipoDeAcabamento));


        } else {
          reject (error);
        }

      } //End of For statement



    }
  });
  };


}
module.exports = new AcabamentoDAO();
