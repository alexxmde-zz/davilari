var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    adminRouter = require('./routes/admin');


app = express(),
ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
port = process.env.OPENSHIFT_NODEJS_PORT || '3000';



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({secret: 'donniebrasco'}));

app.set('view engine', 'ejs');
app.use('/resources', express.static('resources'));
//app.use('/admin', express.static('client/admin'));
app.use('/admin', adminRouter);

app.get('/suamae', function(req, res) {
  res.send("SUA MAE");
});




app.listen(port, ip, function(err) {
  if (err) {
    console.error("Erro ao iniciar servidor: " + err);
    return;
  }

  console.log("Server started at: " + ip + " , port: " + port);
});


