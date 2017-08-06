/**
 * Created by vinhdv on 8/6/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ServiceExecuteSchema = new Schema({
    name: {type: String}
});

ServiceExecuteSchema.set('toJSON', {getters: true});
ServiceExecuteSchema.options.toJSON.transform = function (doc, ret, options) {
};
module.exports = mongoose.model('ServiceExecute', ServiceExecuteSchema);