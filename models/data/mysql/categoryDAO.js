var mysql = require('./connection');
var Promise = require("promise");
function categoryDAO() {

  this.findByName = function(name, cb) {
    var query = "SELECT * FROM Tb_Category ";
    query += "WHERE name = '" + name + "';";

    mysql.query(query, function (err, rows, fields) {

      if (err) return cb(err);

      var category = rows[0];
      return cb(null, category);

    });


  };

  this.findOne = function (id, cb) {
    var query = "SELECT * FROM Tb_Category ";
    query += "WHERE IdCategory = " + id;

    mysql.query(query, function(err, rows) {
      if (err) return cb (err);
      return cb(null, rows[0]);

    });
  };

  this.findAll = function(cb) {

    var query = "SELECT * FROM Tb_Category;";

    var categories = [];

    mysql.query(query, function (err, rows) {
      if (err) return cb(err);

      var categories = rows;

      cb(null, categories);

    });
  };

  this.insert = function (category, cb) {
    var query = "INSERT INTO Tb_Category (name, description) ";
    query += "VALUES ('" + category.name + "'," + "'" +category.description + "');";

    mysql.query(query, function(err) {
      if (err) {
        return cb(err);
      } else {
        return cb();
      }
    });
  };

  this.update = function(id, category, cb)
  {
    var query = "UPDATE Tb_Category SET name = '" + category.name + "', ";
    query += "description = '" + category.description + "' ";
    query += "WHERE IdCategory = " + id;

    mysql.query(query, function (err) {
      if (err) return cb(err);

      else return cb();

    });
  };
}

module.exports = new categoryDAO();
