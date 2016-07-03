var http = require('http');

var server = http.createServer(function(req, res) {
  res.end("aaaaa");
});

server.listen(3000, function() {
  console.log("foi");
});

