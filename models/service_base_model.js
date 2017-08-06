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
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    price: {type: Schema.Types.ObjectId, ref: 'ServicePrice'},
    status: {
        type: Number,
        default: 1
    },
    createdAT: {type: Date, default: Date.now, index: true},
    updateAT: {type: Date, default: Date.now, index: true},
    update: {type: Schema.Types.ObjectId, ref: 'ServiceUpdate'},
    execute: {type: Schema.Types.ObjectId, ref: 'ServiceExecute'}
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