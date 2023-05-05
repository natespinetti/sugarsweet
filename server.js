require('./database');
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express(); 

var session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const MongoStore = require('connect-mongo');

const store = new MongoStore({
  mongoUrl: MONGODB_URI,
  collectionName: 'sessions'
});

// configure express-session middleware
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: store,
}));

// setup handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.listen(4000, function(){
  console.log('http://localhost:4000');
});

