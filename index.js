var express = require('express');

var app = express();
var ip = '127.0.0.1';
var port = '8080';

app.set('view engine', 'ejs');

app.use('/resources', express.static('resources'));

app.get('/', function (req, res) {
  res.render('pages/index');
});

app.listen(port, ip, function(err) {
  if (err) {
    console.error("Erro ao iniciar servidor: " + err);
    return;
  }

  console.log("Server started at: " + ip + " , port: " + port);
});
