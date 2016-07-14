var mysql = require ('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'cthulhu1',
  database : 'davilari'
});


module.exports = connection;


