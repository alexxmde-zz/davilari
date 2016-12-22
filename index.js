process.env.dbenvironment = "development";

//Imports
let express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  adminRouter = require('./routes/admin'),
  publicRouter = require('./routes/public'),
  sessionCheck = require('./middlewares/session'),
  mongoose = require('mongoose'),



//IP Address
app = express(),
ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
port = process.env.OPENSHIFT_NODEJS_PORT || '8000',
db_host = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost',
db_name = 'enterprise',
db_username = process.env.OPENSHIFT_MONGODB_DB_USERNAME || '',
db_password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '',
con_str = '';
if(db_username) 
con_str = `mongodb://${db_username}:${db_password}@${db_host}/${db_name}`;
else
con_str = `mongodb://${db_host}/${db_name}`;

//BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Session
app.use(cookieParser());
app.use(session({secret: 'donniebrasco'}));

//View Engine
app.set('view engine', 'ejs');

//Routes
app.use('/resources', express.static('resources'));
app.use('/admin', sessionCheck,  adminRouter);
app.use(publicRouter);


//Server Start
app.listen(port, ip, function(err) {
  if (err) {
    console.error("Erro ao iniciar servidor: " + err);
    return;
  }
  console.log(con_str);
  mongoose.connect(con_str);
  mongoose.Promise = global.Promise;

  console.log("Server started at: " + ip + " , port: " + port);

});
