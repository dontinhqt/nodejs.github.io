/**
 * Created by vinhdv on 11/27/16.
 */
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/users');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
    var opts = {};
    console.log(ExtractJwt.fromAuthHeader());
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);

            } else {
               return done(null, false);
            }
        });
    }));
};
