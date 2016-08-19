var mysql = require('./connection');

function TipoAcabamentoDAO() {
  this.add = function (tipoAcabamento, resolve, reject) {
    var query = "INSERT INTO Tb_Tipo_Acabamento (nome) ";
    query += " VALUES (?)";

    mysql.query(query, [tipoAcabamento], function (err) {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });

  };
  this.update = function (idTipoAcabamento, tipoAcabamento, resolve, reject) {
    var query = "UPDATE Tb_Tipo_Acabamento SET nome = ? ";
    query += "WHERE IdTipoAcabamento = ?";

    mysql.query(query, [tipoAcabamento, idTipoAcabamento], function (err) {

      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });

  };

  this.buscarTodos = function (resolve, reject) {
    var query = "SELECT * FROM Tb_Tipo_Acabamento";
    mysql.query(query, function (err, rows) {
      if (err) {
        return reject (err);
      } else {
        console.log(rows);
        return resolve(rows);
      }
    });
  };

}

module.exports = new TipoAcabamentoDAO();
