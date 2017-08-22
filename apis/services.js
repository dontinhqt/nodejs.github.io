/**
 * Created by vinhdv on 8/6/17.
 */

var Service = require('../models/services');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var Validator = require('../config/validate');

module.exports.controller = function (app, auth) {
    app.post('/', function (req, res, next) {
        res.status(200).json({msg: "Hello a api"});
        return next;
    });
    //api get service
    app.get('/api/v1/services', auth, function (req, res, next) {
        var limit = 10;
        var page = 0;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        Service.find({}).exec(function (err, services) {
            if (err) {
                res.status(500).json({"err": err});
                return next(err);
            }
            res.status(200).json(services);
        });

    });
    //api get services by type
    app.get('/api/v1/services/type/:type', auth, function (req, res, next) {
        var serviceType = req.params.type;
        var limit = 10;
        var page = 0;
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
            res.status(200).json(services);
        });
    });

    //api get services by group
    app.get('/api/v1/services/group/:group', auth, function (req, res, next) {
        var serviceGroup = req.params.group;
        var limit = 10;
        var page = 0;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }

        Service.find({'group': serviceGroup}).skip(page).limit(limit).exec(function (err, services) {
            if (err) {
                res.status(500).json({"err": err});
                return next(err);
            }
            res.status(200).json(services);
        });
    });
    //api get services by group
    app.get('/api/v1/activeservices', auth, function (req, res, next) {
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
            res.status(200).json(services);
        });
    });

    app.post('/api/v1/services', auth, function (req, res, next) {

        //add validate data
        var isValid = Validator(req.body);
        if (isValid.code==400) {
            return res.status(400).json({msg: isValid.msg});
        }

        var name = req.body.serviceName ? req.body.serviceName : '';
        var active = req.body.active ? req.body.active : true;
        var prices = req.body.price ? req.body.price : new Array();

        var executes = req.body.execute ? req.body.execute : new Array();
        var group = req.body.group ? req.body.group : '';
        var type = req.body.type ? req.body.type : '';


        var priceArr = new Array();
        if (prices.length > 0) {
            for (var i = 0; i < prices.length; i++) {
                var price_origin = prices[i].price_origin ? prices[i].price_origin : 0;
                var first_price = prices[i].first_price ? prices[i].first_price : 0;
                var second_price = prices[i].second_price ? prices[i].second_price : 0;
                var isCover = prices[i].isCover ? prices[i].isCover : false;
                var isDeductible = prices[i].isDeductible ? prices[i].isDeductible : false;
                var isDiscount = prices[i].isDiscount ? prices[i].isDiscount : false;
                priceArr.push({
                    price_origin: price_origin, first_price: first_price, second_price: second_price,
                    isCover: isCover, isDeductible: isDeductible, isDiscount: isDiscount
                });
            }
        }

        var executeArr = new Array();
        if (executes.length > 0) {
            for (var i = 0; i < executes.length; i++) {
                var name = executes[i].name ? executes[i].name : "";
                var id = executes[i].id ? executes[i].id : "";
                executeArr.push({
                    name: name,
                    id:id
                });
            }
        }

        var service = new Service({
            serviceName: name,
            active: active,
            price: priceArr,
            execute: executeArr,
            group: group,
            type: type
        });
        service.save(function (err, response) {
            if (err) {
                res.status(500);
            }
            res.status(201).json({msg: "Service has been created successfully!"});
            return next();
        });
    });

    //api get service by id and name
    app.get('/api/v1/services/:id', function (req, res) {
        if (!req.params.id) {
            res.status(404).json({'msg': 'Request not fount'});
        }
        var where = {};
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            where = {_id: req.params.id};
        } else {
            where = {$text: {$search: req.params.id}};
        }
        Service.findOne(where).exec(function (err, service) {
            if (err) {
                res.status(500);
            }
            if(service){
                res.status(200).json(service);
            }
            res.status(404).json({'msg': 'Request not fount'});
        });
    });

    app.put('/api/v1/services/:id', function (req, res) {
        if (!req.params.id) {
           return res.status(404).json({'msg': 'Request not fount'});
        }
        var isValid = Validator(req.body);
        if (isValid.code==400) {
            return res.status(400).json({msg: isValid.msg});
        }

        var name = req.body.serviceName ? req.body.serviceName : '';
        var active = req.body.active ? req.body.active : false;
        var prices = req.body.price ? req.body.price : new Array();
        var executes = req.body.execute ? req.body.execute : new Array();
        var group = req.body.group ? req.body.group : '';
        var type = req.body.type ? req.body.type : '';

        var priceArr = new Array();
        if (prices.length > 0) {
            for (var i = 0; i < prices.length; i++) {
                var price_origin = prices[i].price_origin ? prices[i].price_origin : 0;
                var first_price = prices[i].first_price ? prices[i].first_price : 0;
                var second_price = prices[i].second_price ? prices[i].second_price : 0;
                var isCover = prices[i].isCover ? prices[i].isCover : false;
                var isDeductible = prices[i].isDeductible ? prices[i].isDeductible : false;
                var isDiscount = prices[i].isDiscount ? prices[i].isDiscount : false;
                priceArr.push({
                    price_origin: price_origin, first_price: first_price, second_price: second_price,
                    isCover: isCover, isDeductible: isDeductible, isDiscount: isDiscount
                });
            }
        }

        var executeArr = new Array();
        if (executes.length > 0) {
            for (var i = 0; i < executes.length; i++) {
                var name = executes[i].name ? executes[i].name : "";
                var id = executes[i].id ? executes[i].id : "";
                executeArr.push({
                    id: id,
                    name: name
                });
            }
        }
        var updateArr = new Array();
        jwt.verify(getToken(req.headers), config.secret, function (err, userDecode) {
            if (err) {
                res.status(500);
            }

            updateArr.push({updateBy: userDecode._doc._id});

            Service.findOne({_id: req.params.id}).exec(function (err, service) {
                if (err) {
                    res.status(500);
                }
                if(service) {
                    service.serviceName = name;
                    service.active = active;
                    service.price = priceArr;
                    service.update = updateArr,
                        service.execute = executeArr;
                    service.group = group;
                    service.type = type;
                    service.save(function (err, resp) {
                        if (err) {
                            res.status(500);
                        }
                        res.status(200).json({msg: 'Updated successfully!'});
                    });
                }
                res.status(422).json({msg: "Request cannot process"});
            });
        });

    });

    //api service delete by id
    app.delete('/api/v1/services/:id', function (req, res) {
        if (!req.params.id) {
            res.status(404).json({msg: "Request not fount"});
        }

        Service.remove({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                res.status(500);
            }
            console.log(resp);
            if(resp) {
                res.status(204).json({msg: 'Deleted successfully!'});
            }
            res.status(422).json({msg: "Request cannot process"});
        });
    });

    app.get('/api/v1/services/:id/price', function (req, res) {
        if (!req.params.id) {
            res.status(404).json({msg: "Request not fount"});
        }

        Service.find({_id: req.params.id}, {price: 1}).exec(function (err, price) {
            if (err) {
                res.status(500);
            }
            if(price) {
                res.status(200).json(price);
            }
            res.status(404).json({msg: "Request not fount"});
        });

    });
    app.get('/api/v1/services/:id/execute', function (req, res) {
        if (!req.params.id) {
            res.status(404).json({msg: "Request not fount"});
        }

        Service.find({_id: req.params.id}, {execute: 1}).exec(function (err, execute) {
            if (err) {
                res.status(500);
            }
            if(execute){
                res.status(200).json(execute);
            }
            res.status(404).json({msg: "Request not fount"});
        });

    });

    app.put('/api/v1/services/:id/softdelete', function (req, res) {
        if (!req.params.id) {
            res.status(404).json({msg: "Request not fount"});
        }
        Service.update({_id: req.params.id}, {$set: {active: req.body.active}}, {w: 1}).exec(function (err, resp) {
            if (err) {
                res.status(500);
            }
            if(resp) {
                res.status(204).json({msg: "Update status active has been successfully!"});
            }
            res.status(422).json({msg: "Request cannot process"});
        });

    });

    //api check exit by id
    app.get('/api/v1/services/:id/exits', function (req, res) {
        if (!req.params.id) {
            res.status(404).json({msg:'Request not fount'});
        }
        Service.findOne({_id: req.params.id}).exec(function (err, service) {
            if (err) {
                res.status(500);
            }
            if(!service){
                res.status(422).json({msg: "Request cannot process"});
            }
            var isValid = true;
            if (!service) {
                isValid = false;
            }
            res.status(200).json(isValid);
        });
    });

    //api replace attributes by id
    app.post('/api/v1/services/:id/replace', function (req, res) {
        if (!req.params.id) {
            return res.status(404).json({'msg': 'Request not fount'});
        }
        var isValid = Validator(req.body);
        if (isValid.code==400) {
            return res.status(400).json({msg: isValid.msg});
        }
        var serviceName = req.body.serviceName ? req.body.serviceName : '';
        var active = req.body.active ? req.body.active : false;
        var prices = req.body.price ? req.body.price : new Array();
        var executes = req.body.execute ? req.body.execute : new Array();
        var group = req.body.group ? req.body.group : '';
        var type = req.body.type ? req.body.type : '';

        var priceArr = new Array();
        if (prices.length > 0) {
            for (var i = 0; i < prices.length; i++) {
                var price_origin = prices[i].price_origin ? prices[i].price_origin : 0;
                var first_price = prices[i].first_price ? prices[i].first_price : 0;
                var second_price = prices[i].second_price ? prices[i].second_price : 0;
                var isCover = prices[i].isCover ? prices[i].isCover : false;
                var isDeductible = prices[i].isDeductible ? prices[i].isDeductible : false;
                var isDiscount = prices[i].isDiscount ? prices[i].isDiscount : false;
                priceArr.push({
                    price_origin: price_origin, first_price: first_price, second_price: second_price,
                    isCover: isCover, isDeductible: isDeductible, isDiscount: isDiscount
                });
            }
        }

        var executeArr = new Array();
        if (executes.length > 0) {
            for (var i = 0; i < executes.length; i++) {
                var name = executes[i].name ? executes[i].name : "";
                var id = executes[i].id ? executes[i].id : "";
                executeArr.push({
                    name: name,
                    id:id
                });
            }
        }

        var updateArr = new Array();
        jwt.verify(getToken(req.headers), config.secret, function (err, userDecode) {
            if (err) {
                res.status(500);
            }

            updateArr.push({updateBy: userDecode._doc._id});

            Service.findOne({_id: req.params.id}).exec(function (err, service) {
                if (err) {
                    res.status(500);
                }
                if(!service){
                    res.status(422).json({msg: "Request cannot process"});
                }
                service.serviceName = serviceName;
                service.active = active;
                service.price = priceArr;
                service.update = updateArr,
                service.execute = executeArr;
                service.group = group;
                service.type = type;
                service.save(function (err, resp) {
                    if (err) {
                        res.status(500);
                    }
                    res.status(204).json({msg: 'Updated successfully!'});
                });

            });
        });

    });

};

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];

        } else {
            return null;
        }
    } else {
        return null;
    }
};

