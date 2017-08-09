process.env.dbenvironment = "development";
require('dotenv').config()
//Imports
let express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  adminRouter = require('./routes/admin'),
  publicRouter = require('./routes/public'),
  sessionCheck = require('./middlewares/session'),
  mongoose = require('mongoose'),



  app = express(),
  port = process.env.PORT,
  con_str = process.env.DB_URL,
  session_secret = process.env.SESSION_SECRET


//BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Session
app.use(cookieParser());
app.use(session({ secret: session_secret }));

//View Engine
app.set('view engine', 'ejs');

//Routes
app.use('/resources', express.static('resources'));
app.use('/admin', sessionCheck,  adminRouter);
app.use(publicRouter);


//Server Start
app.listen(port, function(err) {
  if (err) {
    console.error("Erro ao iniciar servidor: " + err);
    return;
  }
  mongoose.connect(con_str);
  mongoose.Promise = global.Promise;

  console.log("Server started at port: " + port);

});
