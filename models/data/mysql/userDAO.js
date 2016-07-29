var mysql = require('./connection');
var Promise = require("promise");

function UserRepository() {
  this.FindByNameAndPassword = function (username, password, cb) {

    var query = "SELECT * FROM Tb_User ";
    query += "WHERE username = '" + username + "' ";
    query += "AND password = '" + password + "' ";
    query += "LIMIT 1;";
    console.log(query);
    var user = {};

    mysql.query(query, function (err, rows, fields) {
      if (err) return cb(err);

      user = {'username' : rows[0].username};
      cb (null, user);

    });
  };
};

module.exports = new UserRepository();
