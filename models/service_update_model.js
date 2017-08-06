/**
 * Created by vinhdv on 8/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ServiceUpdateSchema = new Schema({
    time: {type: Date, default: Date.now, index: true},
    updateBy: {type: Schema.Types.ObjectId, ref: 'Users'}
});

ServiceUpdateSchema.set('toJSON', {getters: true});
ServiceUpdateSchema.options.toJSON.transform = function (doc, ret, options) {
};
module.exports = mongoose.model('ServiceUpdate', ServiceUpdateSchema);