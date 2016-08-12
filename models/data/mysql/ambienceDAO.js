var Promise = require('promise'),
  mysql = require('./connection.js'),
  utils = require('../../../utils');

function AmbienceDAO () {

  //Retrive ALL ambiences from the database
  this.getAllAmbiences = function (resolve, reject) {

    //Build the query
    var query = "SELECT * FROM Tb_Ambience; ";

    //Executes the query
    mysql.query(query, function handleResult (err, rows) {
      //Handle error
      if (err) {
        reject(err);

        //Handle success
      } else {
        //Simply return the result
        resolve(rows);

      }
    });


  };

  //Get an ambience and it's images
  this.getAmbience = function (IdAmbience, resolve, reject) {
    //Build query to get ambience
    var query = "SELECT * FROM Tb_Ambience";
    query += " WHERE IdAmbience = " + IdAmbience;

    //Executes query
    mysql.query(query, function handleResult (err, rows) {

      if (err) {
        //Handle error
        reject (err);
        return;

      } else {
        var ambience = rows[0];
        query = "SELECT path FROM Tb_Ambience_Image ";
        query += "WHERE IdAmbience = " + ambience.IdAmbience;

        //Query ambience images
        mysql.query(query, function handleResult (err, images) {
          if (err) {
            reject (err);
            return;
          }

          else {
            ambience.images = [];
            images.forEach(function extractPath(image) {
              ambience.images.push(image.path);
            });

            return resolve (ambience);
          }

        });
      }

    });
  };


  //Insert and ambience
  this.addAmbience = function (ambience, resolve, reject) {
    //Build insert query
    var query = "INSERT INTO Tb_Ambience (name, description, mainImage, featured) ";
    query += "VALUES (?, ?, ?, ?); ";

    var arrValues = [
      ambience.name,
      ambience.description,
      ambience.mainImage,
      utils.parseBin(ambience.featured) 
    ];
    //Insert the ambience
    mysql.query(query, arrValues, function handleQResult (err, result) {
      if (err) {
        console.log(arrValues);
        console.log("Error: /n");
        console.log(query);
        reject (err);
        return;

      } else {
        //Build insert image query
        var IdAmbience = result.insertId;
        var throwFlag = false;

        try {
          ambience.images.forEach(function InsertImage (image) {
            query = "INSERT INTO Tb_Ambience_Image (path, IdAmbience) ";
            query += "VALUES (?, ?)";

            if (throwFlag)
              throw throwFlag;

            arrValues = [
              image,
              IdAmbience
            ];

            mysql.query(query, arrValues, function handleQResult (err) {
              if (err) {
                throwFlag = err;

              } else {
                console.log("Image Inserted");
              }

            });
          });

          console.log("Done!");
          return resolve();
        }
        catch (exception) {
          reject (exception);
          return;
        }
      }
    });
  };

  this.updateAmbience = function (ambience, resolve, reject) {
    console.log("Updating ambience " + ambience.IdAmbience);


    var query = "UPDATE Tb_Ambience SET ";
    query += "name = '" + ambience.name + "', ";
    query += "description = '" + ambience.description + "', ";

    if (ambience.mainImage)
      query += "mainImage = '" + ambience.mainImage + "', ";

    query += "featured = " + utils.parseBin(ambience.featured) + " ";
    query += " WHERE IdAmbience = " + ambience.IdAmbience;

    mysql.query(query, function (err) {
      if (err) {
        return reject(err);
      }

      console.log("Deleting ambience images");
      query = "DELETE FROM Tb_Ambience_Image WHERE IdAmbience = " + ambience.IdAmbience;
      mysql.query(query, function(err) {
        if (err) {
          return reject(err);
        }

        console.log("Inserting updated images");

        var insertImages = function (images, IdAmbience, cb) {
          var errorFlag = false;

          for(var i = 0; i < images.length; i++) {
            if(!errorFlag) {
              query = "";
              query += "INSERT INTO Tb_Ambience_Image (IdAmbience, path) VALUES ( ";
              query += IdAmbience + ", '" + images[i] +"'); \n";
              mysql.query(query, function (err) {
                if (err) {
                  errorFlag = true;
                  cb(err);
                  return false;
                }


              });
            }

          }

          return cb();

        };

        if (ambience.images) {
          insertImages(ambience.images, ambience.IdAmbience, function (err) {
            if (err) {
              console.error(err);
              return reject(err);
            }
          });
        }



        return resolve();
      });

    });
  };

};




module.exports = new AmbienceDAO();
