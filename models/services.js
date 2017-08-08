/**
 * Created by vinhdv on 8/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ServiceSchema = new Schema({
    service_name: {
        type: String,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    price: [{
        price_origin: {
            type: Number,
            default: 0
        },
        first_price: {
            type: Number,
            default: 0
        },
        second_price: {
            type: Number,
            default: 0
        },
        third_price: {
            type: Number,
            default: 0
        },
        price_isCover: {
            type: Number,
            default: 0
        },
        price_isDeductible: {
            type: Boolean,
            default: false
        },
        price_isDiscount: {
            type: Boolean,
            default: false
        }
    }],
    status: {
        type: Number,
        default: 1
    },
    createdAT: {type: Date, default: Date.now, index: true},
    updateAT: {type: Date, default: Date.now, index: true},
    update: [{
        time: {type: String},
        updateBy: {type: String}
    }],
    execute: [{name: {type: String}}]
    , group: {
        type: String
    }, type: {
        type: String
    }
});

ServiceSchema.set('toJSON', {getters: true});
ServiceSchema.options.toJSON.transform = function (doc, ret, options) {
};
module.exports = mongoose.model('Services', ServiceSchema);