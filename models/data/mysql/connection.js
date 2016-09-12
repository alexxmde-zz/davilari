var mysql = require ('mysql');
var fs = require('fs');
console.log("Selected Environment: " + process.env.dbenvironment);

try{
switch (process.env.dbenvironment) {

  case "development":
  var credentials = JSON.parse(
    fs.readFileSync(__dirname + '/credentials.json', 'utf-8')
  ).development;
  break;

  case "test":
  var credentials = JSON.parse(
    fs.readFileSync(__dirname + '/credentials.json', 'utf-8')
  ).test;
  break;

  case "production":
    var credentials = JSON.parse(fs.readFileSync(__dirname + "/credentials.json", "utf-8"))
    .production;

}
}
catch (e) {
  var credentials =  {"url" : "davilari.mysql.uhserver.com",
    "port" : "3306",
    "user" : "davilari",
    "password" : "@Cthulhu1",
    "database" : "davilari"
  };
}



var connection = mysql.createConnection({
  host: process.env.OPENSHIFT_MYSQL_DB || credentials.url,
  port: process.env.OPENSHIFT_MYSQL_DB_PORT || credentials.port,
  user: credentials.user,
  password : credentials.password,
  database : credentials.database
});


module.exports = connection;
