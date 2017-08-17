var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

module.exports.controller = function (app, passport) {
    app.post('/api/v1/authenticate', function (req, res, next) {

        var username = req.body.username ? req.body.username : '';
        var password = req.body.password ? req.body.password : '';

        if (username == '') {
            res.status(400).json({'msg': 'Username required !.'});
        }
        if (password == '') {
            res.status(400).json({'msg': 'Password required !.'});
        }

        User.findOne({username: username}, function (err, user) {
            // console.log(user);
            if (err) res.status(500);

            if (!user) {
                res.send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.sign(user, config.secret);
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }

        });
    });
    app.post('/api/v1/users', function (req, res, next) {

        var username = req.body.username ? req.body.username : '';
        var password = req.body.password ? req.body.password : '';
        var email = req.body.email ? req.body.email : '';
        var first_name = req.body.first_name ? req.body.first_name : '';
        var last_name = req.body.last_name ? req.body.last_name : '';
        var status = req.body.status ? req.body.status : 1;
        if (username == '') {
            res.status(400).json({'msg': 'Username required !.'});
        }
        if (password == '') {
            res.status(400).json({'msg': 'Password required !.'});
        }
        if (email == '') {
            res.status(400).json({'msg': 'Email required !.'});
        }
        var rexg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!rexg.test(email)){
            res.status(400).json({'msg': 'Email is not valid !.'});
        }
        var user = new User({
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name,
            status: status,
        });

        user.save(function (err, user) {
            if (err) {
                res.status(500);
            }
            res.json({msg: 'Created a new user has been successfully!.'});
        });
    });

};