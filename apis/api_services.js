/**
 * Created by vinhdv on 8/6/17.
 */

var Service = require('../models/services');

module.exports.controller = function (app) {
    app.get('/', function (req, res, next) {
        res.status(200).json({msg: "Hello a api"});
        return next();
    });

    //api get service
    app.get('/api/v1/services', function (req, res, next) {
        var limit = 10;
        var page = 0;
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
            res.status(200).json({data: services});
        });

    });
    //api get services by type
    app.get('/api/v1/services/type/:type', function (req, res, next) {
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
            res.status(200).json({"data": services});
        });
    });

    //api get services by group
    app.get('/api/v1/services/group/:group', function (req, res, next) {
        var serviceGroup = req.params.group;
        var limit = 10;
        var page = 0;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        console.log(serviceGroup);
        Service.find({'group': serviceGroup}).skip(page).limit(limit).exec(function (err, services) {
            if (err) {
                res.status(500).json({"err": err});
                return next(err);
            }
            res.status(200).json({"data": services});
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

    app.post('/api/v1/services', function (req, res, next) {
        var service_name = req.body.service_name ? req.body.service_name : '';
        var active = req.body.active ? req.body.active : true;
        var prices = req.body.price ? req.body.price : new Array();
        var updates = req.body.update ? req.body.update : new Array();
        var executes = req.body.execute ? req.body.execute : new Array();
        var group = req.body.group ? req.body.group : '';
        var type = req.body.type ? req.body.type : '';
        var priceArr = new Array();
        if (prices) {
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

        var updateArr = new Array();
        if (updates.length > 0) {
            for (var i = 0; i < updates.length; i++) {
                var time = updates[i].time ? updates[i].time : "";
                var updateBy = updates[i].updateBy ? updates[i].updateBy : "";
                updateArr.push({
                    price_origin: time, updateBy: updateBy
                });
            }
        }

        var executeArr = new Array();
        if (executes.length > 0) {
            for (var i = 0; i < executes.length; i++) {
                var name = executes[i].name ? executes[i].name : 0;
                executeArr.push({
                    name: name
                });
            }
        }

        var service = new Service({
            service_name: service_name,
            active: active,
            price: priceArr,
            update: updateArr,
            execute: executeArr,
            group: group,
            type: type
        });
        service.save(function (err, response) {
            if (err) {
                res.status(400).json(err);
                return next;
            }
            res.status(200).json({msg: "Service has been created successfully!"});
            return next;
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
            where = { $text: { $search: req.params.id }};
        }
        Service.findOne(where).exec(function (err, service) {
            if (err) {
                res.status(500);
            }
            res.status(200).json(service);
        });
    });

    app.put('/api/v1/services/:id', function (req, res) {
        if (!req.params.id) {
            res.status(404).json({'msg': 'Request not fount'});
        }

        var service_name = req.body.service_name ? req.body.service_name : '';
        var active = true;
        var prices = req.body.price ? req.body.price : new Array();
        var updates = req.body.update ? req.body.update : new Array();
        var executes = req.body.execute ? req.body.execute : new Array();
        var group = req.body.group ? req.body.group : '';
        var type = req.body.type ? req.body.type : '';
        var priceArr = new Array();
        if (prices) {
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

        var updateArr = new Array();
        if (updates.length > 0) {
            for (var i = 0; i < updates.length; i++) {
                var time = updates[i].time ? updates[i].time : 0;
                var updateBy = updates[i].updateBy ? updates[i].updateBy : 0;
                updateArr.push({
                    time: time, updateBy: updateBy
                });
            }
        }

        var executeArr = new Array();
        if (executes.length > 0) {
            for (var i = 0; i < executes.length; i++) {
                var name = executes[i].name ? executes[i].name : "";
                executeArr.push({
                    name: name
                });
            }
        }

        Service.findOne({_id: req.params.id}).exec(function (err, service) {
            if (err) {
                res.status(500);
            }
            service.service_name = service_name;
            service.active = active;
            service.price = priceArr;
            service.update = updateArr;
            service.execute = executeArr;
            service.group = group;
            service.type = type;
            service.save(function (err, resp) {
                if (err) {
                    res.status(500);
                }
                res.status(200).json({msg: 'Updated successfully!'});
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
            res.status(200).json({msg: 'Deleted successfully!'});
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
            res.status(200).json(price);
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
            res.status(200).json(execute);
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
            res.status(200).json({msg: "Update status active has been successfully!"});
        });

    });


};