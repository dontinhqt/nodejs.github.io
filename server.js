var express = require('express'),
    http = require('http'),
    path = require('path'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    morgan = require('morgan');

var app = module.exports = express();

var passport = require('passport');
var config = require('./config/database');


// all environments
app.set('port', process.env.PORT || 8000);
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(function (req, res, next) {
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
//user passport session and express session
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//passport serialize a User
passport.serializeUser(function(user, done) {
    done(null, user);
});


if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// log to console
app.use(morgan('dev'));


var server = http.createServer(app);

mongoose.connect(config.database);
var db = mongoose.connection;
//passport authenticate middleware should be loaded after the loading the routes
require('./config/passport')(passport);

fs.readdirSync('./apis').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        var route = require('./apis/' + file);
        route.controller(app,passport);
    }
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("open db successfully");
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
