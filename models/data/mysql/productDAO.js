var mysql = require("./connection");

function productDAO() {
  this.insert = function(product, cb) {
    var query = "INSERT INTO Tb_Product (name, description, price) ";
    query += "VALUES ('" + product.name + "', ";
    query += "'" + product.description + "', ";
    query += product.price + " ";
    query += ")";

    mysql.query(query, function (err, rows) {
      if (err) return cb(err);

      return cb();
    });
  };

  this.findAll = function (cb) {
    var query = "SELECT * FROM Tb_Product";

    mysql.query(query, function (err, rows) {
      if (err) return cb(err); 

      return cb(null, rows);
      
    });
  };

  this.findByName = function (name, cb) {
    var query = "SELECT * FROM Tb_Product ";
    query += "WHERE name LIKE '%" + name + "%'";

    mysql.query (query, function (err, rows) {
      if (err) return cb(err);

      return cb(null, rows);

    });
  };
  
}

module.exports = new productDAO();
