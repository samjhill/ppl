// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var secrets = require('./config/secrets.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms



// required for passport
app.use(session({ secret: secrets.sessionSecret,  cookie: { httpOnly: false, maxAge: 7200000 } })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//middleware for all routes
//app.use(function (req, res, next) {
//  console.log(req.user);
//  next();
//});

// routes ======================================================================
app.use('/', express.static('public'));
require('./app/routes/authenticate.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/movement.js')(app, passport);  //administration of movement objects
require('./app/routes/user.js')(app, passport);  //administration of user roles
require('./app/routes/routine.js')(app, passport);  //administration of routine objects

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);