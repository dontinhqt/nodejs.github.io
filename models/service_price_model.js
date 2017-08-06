/**
 * Created by vinhdv on 8/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ServicePriceSchema = new Schema({
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
    },
});

ServicePriceSchema.set('toJSON', {getters: true});
ServicePriceSchema.options.toJSON.transform = function (doc, ret, options) {
};
module.exports = mongoose.model('ServicePrice', ServicePriceSchema);