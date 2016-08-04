var nodemailer = require('nodemailer');
var fs = require('fs');
var Promise = require('promise');

var buildMailOptions = function () {
  var mailOptions = JSON.parse(fs.readFileSync("utils/email.json"));
  return mailOptions;

};
var mailOptions = buildMailOptions();
var transporter = nodemailer.createTransport("smtps://" + mailOptions.user + ":" + mailOptions.password + "@" + mailOptions.smtp);



function Utils() {

  this.parseBin = function parseBin (value) {
    if (value !== "on" || !value)
      return 0;
    else
      return 1;
        
  }

  this.sendMail = function (html) {
    return new Promise (function (resolve, reject) {
      mailOptions.html = html;

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          return reject (error);
        } else {
          return resolve (error);
        }

      });
    });

  };
}

module.exports = new Utils();
