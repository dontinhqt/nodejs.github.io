var express = require('express'),
    http = require('http'),
    path = require('path'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    //load json web token
    jwt = require('jsonwebtoken'),
    morgan = require('morgan');

var app = module.exports = express();
var apiRoutes = express.Router();

//var passport = require('passport');
var config = require('./config/database');
//hashcode set set authenticate
var default_token = require('./config/token');

// all environments
app.set('port', process.env.PORT || 8000);
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(methodOverride());


app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    req.headers.authorization = default_token.secret_token;
    next();
});
//user passport session and express session
//app.use(passport.initialize());
//app.use(passport.session());

//passport serialize a User
//passport.serializeUser(function(user, done) {
//    done(null, user);
//});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// log to console
app.use(morgan('dev'));


var server = http.createServer(app);

mongoose.connect(config.database);
var db = mongoose.connection;

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
    var token = req.headers.authorization ? req.headers.authorization : "";
    if (token) {
        jwt.verify(getToken(req.headers), config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({msg: 'Failed to authenticate token.'});
            }
            req.decoded = decoded;
            next();
        });
    } else {

        return res.status(403).send({
            msg: 'No token provided.'
        });

    }
});

fs.readdirSync('./apis').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        var route = require('./apis/' + file);
        route.controller(app, apiRoutes);
    }
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("open db successfully");
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
