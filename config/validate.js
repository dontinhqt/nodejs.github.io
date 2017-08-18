
module.exports = function (body) {
    var msg = "is valid";
    var code = 200;

    var name = body.serviceName ? body.serviceName : '';
    var prices = body.price ? body.price : new Array();
    var executes = body.execute ? body.execute : new Array();
    var group = body.group ? body.group : '';
    var type = body.type ? body.type : '';

    if (name == "") {
        code = 400;
        msg = "Field service name required!";
    }

    if (group == "") {
        code = 400;
        msg = "Field group required!";
    }
    if (type == "") {
        code = 400;
        msg = "Field type required!";
    }
    if (executes.length == 0) {
        code = 400;
        msg = 'Field execute required!';
    } else {
        for (var i = 0; i < executes.length; i++) {
            if (executes[i].name == "") {
                code = 400;
                msg = "Field execute name required!";
            }
            if (executes[i].id == "") {
                code = 400;
                msg = "Field execute id required!";
            }
        }
    }

    if (prices.length == 0) {
        code = 400;
        msg = "Field price required!";
    } else {
        for (var i = 0; i < prices.length; i++) {
            if (prices[i].price_origin == "") {
                code = 400;
                msg = "Field price origin required";
            }
        }
    }

    return {code: code, msg: msg};

};