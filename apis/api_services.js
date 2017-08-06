/**
 * Created by vinhdv on 8/6/17.
 */

var Service = require('../models/service_base_model'),
    ServicePrice = require('../models/service_price_model'),
    ServiceExecute = require('../models/service_execute_model'),
    User = require('../models/user_model'),
    ServiceUpdate = require('../models/service_update_model');

module.exports.controller = function (app) {
    app.get('/', function (req, res, next) {
        res.status(200).json({"response": "hai con nai"});
        return next();
    });

    //api get service
    app.get('/api/v1/services', function (req, res, next) {
        var limit = 10;
        var page = 1;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        Service.find().skip(page).limit(limit).exec(function (err, services) {
            if (err) {
                res.status(500).json({"err": err});
                return next(err);
            }
            res.status(200).json({"response": services});
        });

    });
    //api get services by type
    app.get('/api/v1/services/:type', function (req, res, next) {
        var serviceType = req.params.type;
        var limit = 10;
        var page = 1;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        Service.find({'type': serviceType}).skip(page).limit(limit).exec(function (err, services) {
            if (err) {
                res.status(500).json({"err": err});
                return next(err);
            }
            res.status(200).json({"response": services});
        });
    });

    //api get services by group
    app.get('/api/v1/services/:group', function (req, res, next) {
        var serviceGroup = req.params.group;
        var limit = 10;
        var page = 1;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        Service.find({'type': serviceGroup}).skip(page).limit(limit).exec(function (err, services) {
            if (err) {
                res.status(500).json({"err": err});
                return next(err);
            }
            res.status(200).json({"response": services});
        });
    });
    //api get services by group
    app.get('/api/v1/activeservices', function (req, res, next) {
        var limit = 10;
        var page = 1;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        Service.find({'active': true}).skip(page).limit(limit).exec(function (err, services) {
            if (err) {
                res.status(500).json({"err": err});
                return next(err);
            }
            res.status(200).json({"response": services});
        });
    });
};