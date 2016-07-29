var mysql = require('./connection');
var utils = require('../../../utils');
var Promise = require("promise");
function saleDAO() {
  this.findAll = function() {

      var query = "SELECT * FROM Tb_Sale";
    return new Promise (function (resolve, reject) {

      mysql.query(query, function (err, rows) {
        if (err)
          return reject(err);

        resolve(rows);

      });
    });
  };

  this.findOne = function (id) {
    var query = "SELECT * FROM Tb_Sale \n";
    query += "WHERE IdSale = " + id;

    return new Promise (function (resolve, reject) {

      mysql.query(query, function (err, rows) {
        var arrRows = [];
        if (err) return reject(err + "\n" + query);
          /*
        arrRows = rows.map(function (row) {
          return {
            IdSale: row.IdSale,
            name : row.name,
            description : row.description,
            subdescription : row.subdescription,
            active : row.active,
            link : row.link,
            image : row.image
          };
        });
        */
        return resolve(rows[0]);

      });

    });
  };

  this.insert = function (sale) {
    return new Promise (function (resolve, reject) {
      var query = "INSERT INTO Tb_Sale\n"
      query += "(name, description, subdescription, active, link, image)\n";
      query += "VALUES (?, ?, ?, ?, ?, ?)";
      var arr = [sale.name, sale.description, sale.subdescription, utils.parseBin(sale.active),
        sale.link, sale.image];

      mysql.query(query, arr, function (err) {
        if (err) return reject(err + "\n" + query);

    return resolve();

      });


    });
  };

  this.update = function (IdSale, sale) {
    return new Promise(function (resolve, reject) {
      var query = "UPDATE Tb_Sale SET ";
      query += "name = '" + sale.name +"', ";
      query += "description = '" + sale.description +"', ";
      query += "subdescription = '" + sale.subdescription + "', ";
      query += "active = " + utils.parseBin(sale.active) + ", ";
      if (sale.image) {
        query += "image = '" + sale.image + "', ";
      }
      query += "link = '" + sale.link + "' ";
      query += "WHERE IdSale = " + IdSale;

      mysql.query(query, function (err) {
        if (err) return reject (err + "\n" + query);

        return resolve();
      });
    });
  };

}


module.exports = new saleDAO();
